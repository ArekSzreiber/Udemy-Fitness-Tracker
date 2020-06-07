import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = [
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8},
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'leg-raises', name: 'Leg Raises', duration: 45, calories: 5},
    {id: 'push-ups', name: 'Push-ups', duration: 35, calories: 7},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'squats', name: 'Squats', duration: 60, calories: 10},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    // todo try to replace hardcoded exercises with these exercises
  ];

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }
}
