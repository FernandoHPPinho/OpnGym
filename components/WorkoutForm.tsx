'use client'

import React, { useState, FormEvent } from 'react'
import { Exercise, WorkoutDay } from '../types/workout'
import { addWorkout } from '../lib/workout'
import WorkoutPlanSelector from './WorkoutPlanSelector'

export default function WorkoutForm() {
  const [exercises, setExercises] = useState([
    { name: '', sets: 0, reps: 0, weight: 0 }
  ] as Exercise[])
  const [useWorkoutPlan, setUseWorkoutPlan] = useState(false)
  const [selectedDayName, setSelectedDayName] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await addWorkout(new Date().toISOString().split('T')[0], exercises)
      setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }])
      setSelectedDayName('')
      alert('Workout added successfully!')
    } catch (error) {
      console.error('Error adding workout:', error)
      alert('Error adding workout')
    }
  }

  const handleDaySelect = (day: WorkoutDay) => {
    setExercises(day.exercises)
    setSelectedDayName(day.name)
  }

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }])
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const newExercises = [...exercises]
    newExercises[index] = { ...newExercises[index], [field]: value }
    setExercises(newExercises)
  }

  return (
    <div className="space-y-6">
      {/* Workout Plan Selection */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Workout Options</h3>
          <button
            type="button"
            onClick={() => {
              setUseWorkoutPlan(!useWorkoutPlan)
              if (!useWorkoutPlan) {
                setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }])
                setSelectedDayName('')
              }
            }}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            {useWorkoutPlan ? 'Use Manual Entry' : 'Use Workout Plan'}
          </button>
        </div>

        {useWorkoutPlan ? (
          <WorkoutPlanSelector onDaySelect={handleDaySelect} />
        ) : (
          <p className="text-gray-600">Add exercises manually below</p>
        )}
      </div>

      {/* Selected Day Display */}
      {selectedDayName && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-blue-900 font-medium">Selected: {selectedDayName}</p>
        </div>
      )}

      {/* Exercise Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Exercises</h3>
        
        {exercises.map((exercise, index) => (
          <div key={index} className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Exercise name"
              value={exercise.name}
              onChange={(e) => updateExercise(index, 'name', e.target.value)}
              className="border p-2 flex-1 min-w-48"
            />
            <input
              type="number"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
              className="border p-2 w-20"
            />
            <input
              type="number"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
              className="border p-2 w-20"
            />
            <input
              type="number"
              placeholder="Weight"
              value={exercise.weight}
              onChange={(e) => updateExercise(index, 'weight', parseInt(e.target.value) || 0)}
              className="border p-2 w-24"
            />
            <button
              type="button"
              onClick={() => removeExercise(index)}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addExercise}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Exercise
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Workout
          </button>
        </div>
      </form>
    </div>
  )
}