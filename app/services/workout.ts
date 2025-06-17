import { supabase } from '../../lib/supabase'
import { Workout, Exercise } from '../types/workout'

export const workoutService = {
  async addWorkout(exercises: Exercise[]): Promise<{ success: boolean; error?: string; data?: Workout }> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      const { data, error } = await supabase
        .from('workouts')
        .insert([
          {
            user_id: user.id,
            date: new Date().toISOString(),
            exercises,
          },
        ])
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while adding workout',
      }
    }
  },

  async getWorkouts(): Promise<{ success: boolean; error?: string; data?: Workout[] }> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })

      if (error) throw error

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while fetching workouts',
      }
    }
  }
} 