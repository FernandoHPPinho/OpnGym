import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OpenGym - Workout Tracker',
  description: 'Track your workouts, set goals, and achieve your fitness dreams. Your personal fitness companion.',
  keywords: ['fitness', 'workout', 'tracker', 'gym', 'exercise'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OG</span>
                </div>
                <a href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  OpenGym
                </a>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
                <a href="/auth/sign-in" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </a>
                <a 
                  href="/auth/sign-up" 
                  className="btn btn-primary"
                >
                  Get Started
                </a>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">OG</span>
                  </div>
                  <span className="text-xl font-bold">OpenGym</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  Your personal fitness companion. Track workouts, set goals, and achieve your fitness dreams with our comprehensive workout tracking platform.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="/protected/workouts" className="hover:text-white transition-colors">Workout History</a></li>
                  <li><a href="/protected/workouts/new" className="hover:text-white transition-colors">New Workout</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Account</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/auth/sign-in" className="hover:text-white transition-colors">Sign In</a></li>
                  <li><a href="/auth/sign-up" className="hover:text-white transition-colors">Sign Up</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 OpenGym.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 