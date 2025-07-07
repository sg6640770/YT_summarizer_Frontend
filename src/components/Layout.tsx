import React from 'react'
import { LogOut, User, Video } from 'lucide-react'
import toast from 'react-hot-toast'
import { useUserData, useSignOut } from '@nhost/react'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { signOut } = useSignOut()
  const user = useUserData()

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out successfully!')
  }

  // If not authenticated, just show the children (i.e. AuthForm)
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex container for header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 h-auto py-4 sm:py-0 sm:h-16">
            {/* Branding */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  YouTube Summarizer
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  AI-powered video insights
                </p>
              </div>
            </div>

            {/* User Info + Sign Out */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span className="break-all">{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}
