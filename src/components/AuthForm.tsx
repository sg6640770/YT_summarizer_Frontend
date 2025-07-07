import React, { useState } from 'react'
import { useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/react'
import { Eye, EyeOff, Mail, Lock, Video } from 'lucide-react'
import toast from 'react-hot-toast'

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { signInEmailPassword } = useSignInEmailPassword()
  const { signUpEmailPassword } = useSignUpEmailPassword()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        const result = await signInEmailPassword(email, password)
        if (result.isSuccess) {
          toast.success('Signed in successfully!')
        } else {
          const msg = result.error?.message || 'Sign in failed'
          handleErrorMessage(msg, 'Sign in')
        }
      } else {
        const result = await signUpEmailPassword(email, password)
        if (result.isSuccess) {
          toast.success('Account created! You can now sign in.')
          setIsLogin(true)
        } else {
          const msg = result.error?.message || 'Verification link sent please verify your email first'
          handleErrorMessage(msg, 'Sign up')
        }
      }
    } catch (err) {
      console.error(err)
      toast.error('Unexpected error. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  const handleErrorMessage = (message: string, type: 'Sign in' | 'Sign up') => {
    if (!message) {
      toast.error(`${type} failed. Unknown error.`)
      return
    }

    if (
      message.includes('Invalid email or password') ||
      message.includes('invalid-email-password')
    ) {
      toast.error('Invalid credentials. Please try again.')
    } else if (
      message.includes('User not found') ||
      message.includes('user-not-found')
    ) {
      toast.error('No account found. Please sign up.')
    } else if (
      message.includes('User already exists') ||
      message.includes('email-already-in-use')
    ) {
      toast.error('Email already in use. Please sign in.')
      setIsLogin(true)
    } else if (message.includes('network') || message.includes('fetch')) {
      toast.error('Network error. Check your internet connection and Nhost config.')
    } else {
      toast.error(`${type} failed: ${message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              YouTube Summarizer
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  minLength={6}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> Ensure your Nhost project is correctly set up.
              Check your <code>.env</code> file for the correct subdomain and region.
              Use the browser console for more error information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
