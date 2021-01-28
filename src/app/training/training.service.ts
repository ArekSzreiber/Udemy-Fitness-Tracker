/* tslint:disable:no-string-literal */
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private firebaseSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>,
  ) {
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: 'completed',
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: 'cancelled',
        duration: exercise.duration * progress / 100,
        calories: exercise.calories * progress / 100,
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchAvailableExercises(): void {
    this.store.dispatch(new UI.StartLoading());
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
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        }, error => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar('Fetching exercises failed, please try again later', null, 3000);
        })
    );
  }

  startExercise(selectedId: string) {
    // this is how you can select single document
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  fetchPastExercises() {
    this.firebaseSubscriptions.push(
      this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }

  public cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
