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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await addWorkout(new Date().toISOString().split('T')[0], exercises)
      setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }])
      setSelectedDayName('')
      
      // success message
      const successMessage = document.createElement('div')
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in'
      successMessage.textContent = 'Treino registrado com sucesso'
      document.body.appendChild(successMessage)
      
      setTimeout(() => {
        document.body.removeChild(successMessage)
      }, 3000)
    } catch (error) {
      console.error('Erro ao adicionar treino:', error)
      
      // error message
      const errorMessage = document.createElement('div')
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in'
      errorMessage.textContent = 'Erro ao registrar treino. Por favor, tente novamente'
      document.body.appendChild(errorMessage)
      
      setTimeout(() => {
        document.body.removeChild(errorMessage)
      }, 3000)
    } finally {
      setIsSubmitting(false)
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
    <div className="space-y-8">
      {/* Workout Plan Selection */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Workout Options</h3>
            <button
              type="button"
              onClick={() => {
                setUseWorkoutPlan(!useWorkoutPlan)
                if (!useWorkoutPlan) {
                  setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }])
                  setSelectedDayName('')
                }
              }}
              className="btn btn-ghost text-sm"
            >
              {useWorkoutPlan ? 'Use Manual Entry' : 'Use Workout Plan'}
            </button>
          </div>
        </div>
        
        <div className="card-body">
          {useWorkoutPlan ? (
            <WorkoutPlanSelector onDaySelect={handleDaySelect} />
          ) : (
            <p className="text-gray-600">Add exercises manually below</p>
          )}
        </div>
      </div>

      {/* Selected Day Display */}
      {selectedDayName && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-blue-900 font-medium">Selected: {selectedDayName}</p>
          </div>
        </div>
      )}

      {/* Exercise Form */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-xl font-semibold text-gray-900">Exercises</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="card-body space-y-6">
          {exercises.map((exercise, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 animate-slide-in">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bench Press"
                    value={exercise.name}
                    onChange={(e) => updateExercise(index, 'name', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sets
                  </label>
                  <input
                    type="number"
                    placeholder="3"
                    value={exercise.sets}
                    onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                    className="form-input"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reps
                  </label>
                  <input
                    type="number"
                    placeholder="10"
                    value={exercise.reps}
                    onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                    className="form-input"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={exercise.weight}
                    onChange={(e) => updateExercise(index, 'weight', parseInt(e.target.value) || 0)}
                    className="form-input"
                    min="0"
                  />
                </div>
                
                <div className="flex items-end space-x-2">
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="btn bg-red-500 text-white hover:bg-red-600 p-2"
                    disabled={exercises.length === 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={addExercise}
              className="btn btn-secondary"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Exercise
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex-1"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Workout
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}