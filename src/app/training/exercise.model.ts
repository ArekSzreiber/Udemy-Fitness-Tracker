export interface Exercise {
  id: string;
  name: string;
  duration: number; // seconds
  calories: number; // burned during full exercise
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
