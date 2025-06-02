export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }
  
  export interface Workout {
    id: string;
    created_at: string;
    date: string;
    exercises: Exercise[];
  }