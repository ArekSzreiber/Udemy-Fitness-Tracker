import { NgModule } from '@angular/core';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirestoreDatePipe } from './firestore-date.pipe';
import { SharedModule } from '../shared/shared.module';

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
    AngularFirestoreModule,
    SharedModule,
  ],
  entryComponents: [StopTrainingComponent]

})
export class TrainingModule {
}
