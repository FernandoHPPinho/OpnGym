'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { workoutService } from '../services/workout'
import { Workout } from '../types/workout'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadWorkouts()
  }, [])

  const loadWorkouts = async () => {
    try {
      const result = await workoutService.getWorkouts()
      if (result.success && result.data) {
        setWorkouts(result.data)
      } else {
        setError(result.error || 'Failed to load workouts')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-800 rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Workout History</h1>
          <Link
            href="/workouts/new"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            New Workout
          </Link>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {workouts.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No workouts recorded yet. Start your fitness journey!
          </div>
        ) : (
          <div className="space-y-6">
            {workouts.map((workout) => (
              <div key={workout.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {new Date(workout.date).toLocaleDateString()}
                  </h2>
                </div>

                <div className="space-y-4">
                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className="bg-gray-700 rounded p-4">
                      <h3 className="font-medium mb-2">{exercise.name}</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
                        <div>
                          <span className="font-medium">Sets:</span> {exercise.sets}
                        </div>
                        <div>
                          <span className="font-medium">Reps:</span> {exercise.reps}
                        </div>
                        <div>
                          <span className="font-medium">Weight:</span> {exercise.weight} kg
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 