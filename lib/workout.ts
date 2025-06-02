import { supabase } from './supabase'
import { Workout, Exercise } from '../types/workout'

export async function addWorkout(date: string, exercises: Exercise[]) {
  const { data, error } = await supabase
    .from('workouts')
    .insert([
      {
        date,
        exercises,
      },
    ])
    .select()

  if (error) throw error
  return data
}

export async function getWorkouts() {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error
  return data as Workout[]
}