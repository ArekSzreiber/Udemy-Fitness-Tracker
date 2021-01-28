import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import *  as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.TrainingState>,
  ) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1)).subscribe(exercise => {
      // step in milliseconds
      const step = exercise.duration * 10; // / 100 * 1000ms
      this.timer = setInterval(() => {
        this.progress++;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed!');
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
