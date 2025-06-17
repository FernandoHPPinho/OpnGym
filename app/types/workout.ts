export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Workout {
  id?: string;
  user_id: string;
  date: string;
  exercises: Exercise[];
  created_at?: string;
} 