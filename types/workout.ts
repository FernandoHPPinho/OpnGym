export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

export interface WorkoutDay {
  name: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  day_1: WorkoutDay;
  day_2: WorkoutDay;
  day_3: WorkoutDay;
  day_4: WorkoutDay;
  day_5: WorkoutDay;
}

export interface Workout {
  id: string;
  created_at: string;
  date: string;
  exercises: Exercise[];
}

export interface WorkoutPlanData {
  workout_plan: WorkoutPlan;
}