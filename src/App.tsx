import React from 'react'
import { NhostProvider } from '@nhost/react'
import { useAuthenticationStatus } from '@nhost/react'
import { Toaster } from 'react-hot-toast'
import { nhost } from './lib/nhost'
import { Layout } from './components/Layout'
import { AuthForm } from './components/AuthForm'
import { Dashboard } from './components/Dashboard'


const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (

          
    <Layout>
      
      {isAuthenticated ? <Dashboard /> : <AuthForm />}
    </Layout>
  )
}

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
        }}
      />
    </NhostProvider>
  )
}

export default App
