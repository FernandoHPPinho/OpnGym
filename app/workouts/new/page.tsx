'use client'

import WorkoutForm from '../../../components/WorkoutForm'

export default function NewWorkoutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Workout</h1>
      <WorkoutForm />
    </div>
  )
} 