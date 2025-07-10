'use client'

import { useEffect, useState } from 'react'
import { authService } from '../services/auth'

export default function ProtectedHome() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadUser = async () => {
      const result = await authService.getUser()
      if (result.success && result.data) {
        setUser(result.data)
      }
    }

    loadUser()
  }, [])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to OpenGym
      </h1>
      {user && (
        <p className="text-gray-600">
          Signed in as {user.email}
        </p>
      )}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/protected/workouts/new"
            className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h3 className="font-medium text-blue-900">New Workout</h3>
            <p className="text-sm text-blue-700 mt-1">
              Start tracking a new workout session
            </p>
          </a>
          <a
            href="/protected/workouts"
            className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <h3 className="font-medium text-green-900">View History</h3>
            <p className="text-sm text-green-700 mt-1">
              Check your workout history and progress
            </p>
          </a>
        </div>
      </div>
    </div>
  )
} 