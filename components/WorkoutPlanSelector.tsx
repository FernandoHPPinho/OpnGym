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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Select Workout Day</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(defaultWorkoutPlan).map(([dayKey, day]) => (
          <button
            key={dayKey}
            onClick={() => handleDaySelect(dayKey)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedDay === dayKey
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-medium text-gray-900">{day.name}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {day.exercises.length} exercises
            </p>
          </button>
        ))}
      </div>
    </div>
  )
} 