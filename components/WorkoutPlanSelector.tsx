'use client'

import React, { useState } from 'react'
import { WorkoutPlan, WorkoutDay } from '../types/workout'

// Predefined workout plan based on the JSON file
const defaultWorkoutPlan: WorkoutPlan = {
  day_1: {
    name: "Push (Peito, Ombros, Tríceps)",
    exercises: [
      {"name": "Supino Reto com Barra", "reps": 6, "sets": 4, "weight": 0},
      {"name": "Supino Inclinado com Halteres", "reps": 8, "sets": 3, "weight": 0},
      {"name": "Desenvolvimento Militar", "reps": 8, "sets": 3, "weight": 0},
      {"name": "Elevação Lateral", "reps": 12, "sets": 3, "weight": 0},
      {"name": "Tríceps Francês", "reps": 10, "sets": 3, "weight": 0},
      {"name": "Tríceps Corda (Polia Alta)", "reps": 12, "sets": 2, "weight": 0}
    ]
  },
  day_2: {
    name: "Pull (Costas, Bíceps)",
    exercises: [
      {"name": "Barra Fixa", "reps": 6, "sets": 4, "weight": 0},
      {"name": "Remada Curvada com Barra", "reps": 8, "sets": 3, "weight": 0},
      {"name": "Puxada Alta (Polia Aberta)", "reps": 10, "sets": 3, "weight": 0},
      {"name": "Rosca Direta com Barra", "reps": 8, "sets": 3, "weight": 0},
      {"name": "Rosca Martelo", "reps": 10, "sets": 3, "weight": 0},
      {"name": "Encolhimento com Halteres", "reps": 12, "sets": 3, "weight": 0}
    ]
  },
  day_3: {
    name: "Pernas (Quadríceps, Posterior)",
    exercises: [
      {"name": "Agachamento Livre", "reps": 6, "sets": 4, "weight": 0},
      {"name": "Leg Press 45°", "reps": 10, "sets": 3, "weight": 0},
      {"name": "Cadeira Extensora", "reps": 12, "sets": 3, "weight": 0},
      {"name": "Stiff (Terra Romano)", "reps": 8, "sets": 3, "weight": 0},
      {"name": "Mesa Flexora", "reps": 10, "sets": 3, "weight": 0},
      {"name": "Panturrilha em Pé", "reps": 15, "sets": 4, "weight": 0}
    ]
  },
  day_4: {
    name: "Upper (Peito/Ombro + Costas/Bíceps)",
    exercises: [
      {"name": "Supino Declinado", "reps": 8, "sets": 3, "weight": 0},
      {"name": "Crucifixo Inclinado", "reps": 12, "sets": 3, "weight": 0},
      {"name": "Desenvolvimento Arnold", "reps": 10, "sets": 3, "weight": 0},
      {"name": "Remada Baixa (Polia Triângulo)", "reps": 10, "sets": 3, "weight": 0},
      {"name": "Pulldown (Pegada Inversa)", "reps": 10, "sets": 3, "weight": 0},
      {"name": "Rosca Scott", "reps": 8, "sets": 3, "weight": 0}
    ]
  },
  day_5: {
    name: "Lower (Pernas + Abdômen)",
    exercises: [
      {"name": "Afundo Bulgaro", "reps": 8, "sets": 3, "weight": 0},
      {"name": "Cadeira Adutora/Abdutora", "reps": 12, "sets": 3, "weight": 0},
      {"name": "Elevação Pélvica", "reps": 12, "sets": 3, "weight": 0},
      {"name": "Gêmeos Sentado", "reps": 15, "sets": 4, "weight": 0},
      {"name": "Prancha Abdominal", "reps": 0, "sets": 3, "weight": 0},
      {"name": "Elevação de Pernas Suspenso", "reps": 12, "sets": 3, "weight": 0}
    ]
  }
}

interface WorkoutPlanSelectorProps {
  onDaySelect: (day: WorkoutDay) => void;
}

export default function WorkoutPlanSelector({ onDaySelect }: WorkoutPlanSelectorProps) {
  const [selectedDay, setSelectedDay] = useState<string>('')

  const handleDaySelect = (dayKey: string) => {
    setSelectedDay(dayKey)
    const day = defaultWorkoutPlan[dayKey as keyof WorkoutPlan]
    onDaySelect(day)
  }

  const getDayIcon = (dayKey: string) => {
    const icons = {
      day_1: "", // Push
      day_2: "", // Pull
      day_3: "", // Legs
      day_4: "", // Upper
      day_5: ""  // Lower
    }
    return icons[dayKey as keyof typeof icons] || ""
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Select Workout Day</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(defaultWorkoutPlan).map(([dayKey, day]) => (
          <button
            key={dayKey}
            onClick={() => handleDaySelect(dayKey)}
            className={`card transition-all duration-200 ${
              selectedDay === dayKey
                ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                : 'hover:shadow-md hover:scale-105'
            }`}
          >
            <div className="card-body text-center">
              <div className="text-3xl mb-3">{getDayIcon(dayKey)}</div>
              <h4 className="font-semibold text-gray-900 mb-2">{day.name}</h4>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {day.exercises.length} exercises
                </span>
              </div>
              
              {selectedDay === dayKey && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    {day.exercises.slice(0, 3).map(ex => ex.name).join(', ')}
                    {day.exercises.length > 3 && '...'}
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 