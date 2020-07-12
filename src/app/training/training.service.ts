import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8},
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'leg-raises', name: 'Leg Raises', duration: 45, calories: 5},
    {id: 'push-ups', name: 'Push-ups', duration: 35, calories: 7},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'squats', name: 'Squats', duration: 60, calories: 10},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
  ];
  private runningExercise: Exercise;
  private pastExercises: Exercise[] = [];

  completeExercise() {
    this.pastExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.runningExercise);
  }

  cancelExercise(progress: number) {
    this.pastExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * progress / 100,
      calories: this.runningExercise.calories * progress / 100,
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.runningExercise);
  }

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exercise => {
      return exercise.id === selectedId;
    });
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  getPastExercises() {
    return this.pastExercises.slice();
  }
}
