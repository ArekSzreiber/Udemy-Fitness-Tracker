import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private trainingService: TrainingService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getPastExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
