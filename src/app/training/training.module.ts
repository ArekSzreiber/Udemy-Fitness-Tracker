import { NgModule } from '@angular/core';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { FirestoreDatePipe } from './firestore-date.pipe';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    FirestoreDatePipe,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    TrainingComponent,
  ],
  imports: [
    ReactiveComponentModule,
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  entryComponents: [StopTrainingComponent]

})
export class TrainingModule {
}
