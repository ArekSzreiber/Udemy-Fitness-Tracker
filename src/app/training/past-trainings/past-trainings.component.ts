import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private pastExercisesChangedSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
  ) {
  }

  ngOnInit(): void {
    this.pastExercisesChangedSubscription = this.trainingService.pastExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });
    this.trainingService.fetchPastExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.pastExercisesChangedSubscription.unsubscribe();
  }
}
