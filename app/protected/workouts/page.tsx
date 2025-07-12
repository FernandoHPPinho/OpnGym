'use client'

import { useEffect, useState } from 'react'
import { getWorkouts } from '../../../lib/workout'
import { Workout } from '../../../types/workout'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await getWorkouts()
        setWorkouts(data)
      } catch (error) {
        console.error('Error loading workouts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Histórico de treinos</h1>
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Workout History</h1>
      
      {workouts.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No workouts found. Start your first workout!</p>
          <a href="/protected/workouts/new" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
            Create New Workout
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Workout on {workout.date}</h3>
              <div className="space-y-2">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
                    {exercise.weight && `, ${exercise.weight}kg`}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 