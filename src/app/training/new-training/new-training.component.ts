/* tslint:disable:no-string-literal */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  exercises: Observable<Exercise>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.exercises = this.db
      .collection('availableExercises')
      // .valueChanges();
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              calories: doc.payload.doc.data()['calories'],
              duration: doc.payload.doc.data()['duration'],
            };
          });
        })
      );
    ;
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
