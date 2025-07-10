import React, { useEffect, useState } from 'react';
import { NhostProvider } from '@nhost/react';
import { useAuthenticationStatus } from '@nhost/react';
import { Toaster, toast } from 'react-hot-toast';
import { nhost } from './lib/nhost';
import { Layout } from './components/Layout';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.body.style.backgroundColor = mode === 'dark' ? '#042743' : 'white';
  }, [mode]);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      toast.success('Dark mode has been enabled');
    } else {
      setMode('light');
      toast.success('Light mode has been enabled');
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${mode === 'dark' ? 'bg-[#042743]' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className={mode === 'dark' ? 'text-white' : 'text-gray-600'}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${mode === 'dark' ? 'bg-[#042743] text-white' : 'bg-white text-black'} min-h-screen`}>
      <Layout mode={mode} toggleMode={toggleMode}>
        {isAuthenticated ? <Dashboard /> : <AuthForm />}
      </Layout>
    </div>
  );
};

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#374151',
            color: '#fff',
          },
          success: {
            icon: '✅',
          },
          error: {
            icon: '❌',
          },
        }}
      />
    </NhostProvider>
  );
}

export default App;
