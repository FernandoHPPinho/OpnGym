import { supabase } from '../../lib/supabase'
import { AuthError } from '@supabase/supabase-js'

export interface AuthResponse {
  success: boolean
  error?: string
  data?: any
}

export const authService = {
  /**
   * Sign up a new user with email and password
   */
  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof AuthError ? error.message : 'An error occurred during sign up',
      }
    }
  },

  /**
   * Sign in a user with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('Attempting to sign in with email:', email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Supabase auth error:', error)
        throw error
      }

      console.log('Sign in successful, session data:', data)
      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error('Detailed sign in error:', error)
      return {
        success: false,
        error: error instanceof AuthError ? error.message : 'An error occurred during sign in',
      }
    }
  },

  /**
   * Sign out the current user
   */
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof AuthError ? error.message : 'An error occurred during sign out',
      }
    }
  },

  /**
   * Reset password for a user
   */
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof AuthError ? error.message : 'An error occurred during password reset',
      }
    }
  },

  /**
   * Get the current user session
   */
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error

      return {
        success: true,
        data: session,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof AuthError ? error.message : 'An error occurred while getting session',
      }
    }
  },

  /**
   * Get the current user
   */
  async getUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error

      return {
        success: true,
        data: user,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof AuthError ? error.message : 'An error occurred while getting user',
      }
    }
  },
} 