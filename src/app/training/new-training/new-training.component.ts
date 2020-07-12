import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  exercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.exercises = this.db
      .collection('availableExercises')
      .valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
