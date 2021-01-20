/* tslint:disable:no-string-literal */
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { Error } from 'tslint/lib/error';


@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  pastExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[];
  private runningExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
  ) {
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.runningExercise);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * progress / 100,
      calories: this.runningExercise.calories * progress / 100,
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.runningExercise);
  }

  fetchAvailableExercises(): void {
    this.uiService.loadingStateChanged.next(true);
    this.firebaseSubscriptions.push(
      this.db
        .collection('availableExercises')
        // .valueChanges();
        .snapshotChanges()
        .pipe(
          map(docArray => {
            // throw(new Error())
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                calories: doc.payload.doc.data()['calories'],
                duration: doc.payload.doc.data()['duration'],
              };
            });
          })
        )
        .subscribe((exercises: Exercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar('Fetching exercises failed, please try again later', null, 3000);
          this.exercisesChanged.next(null);
        })
    );
  }

  startExercise(selectedId: string) {
    // this is how you can select single document
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(exercise => {
      return exercise.id === selectedId;
    });
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchPastExercises() {
    this.firebaseSubscriptions.push(
      this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.pastExercisesChanged.next(exercises);
        })
    );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  public cancelSubscriptions(){
    this.firebaseSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
