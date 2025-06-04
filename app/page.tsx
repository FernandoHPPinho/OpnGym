import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to OpnGym</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          Your personal fitness companion. Track your workouts, set goals, and achieve your fitness dreams.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link 
            href="/auth/signin" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/signup" 
            className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  )
}