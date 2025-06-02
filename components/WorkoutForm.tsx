'use client'

import React, { useState } from 'react'
import { Exercise } from '../types/workout'
import { addWorkout } from '../lib/workout'

export default function WorkoutForm() {
  const [exercises, setExercises] = useState([
    { name: '', sets: 0, reps: 0, weight: 0 }
  ] as Exercise[])

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    try {
      await addWorkout(new Date().toISOString().split('T')[0], exercises)
      setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }])
      alert('Workout added successfully!')
    } catch (error) {
      console.error('Error adding workout:', error)
      alert('Error adding workout')
    }
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {exercises.map((exercise, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder="Exercise name"
            value={exercise.name}
            onChange={(e) => updateExercise(index, 'name', e.target.value)}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Sets"
            value={exercise.sets}
            onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Reps"
            value={exercise.reps}
            onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value))}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Weight"
            value={exercise.weight}
            onChange={(e) => updateExercise(index, 'weight', parseInt(e.target.value))}
            className="border p-2"
          />
          <button
            type="button"
            onClick={() => removeExercise(index)}
            className="bg-red-500 text-white px-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addExercise}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add Exercise
      </button>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 ml-2"
      >
        Save Workout
      </button>
    </form>
  )
}