import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
  ) {
  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
        this.ongoingTraining = !!exercise;
      }
    );
  }

  ngOnDestroy(): void {
    this.exerciseSubscription?.unsubscribe();
  }

}
