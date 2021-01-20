import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { MaterialModule } from '../material.module';
import { AuthModule } from '../auth/auth.module';
import { TrainingComponent } from './training.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirestoreDatePipe } from './firestore-date.pipe';

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
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    AuthModule,
  ],
  entryComponents: [StopTrainingComponent]

})
export class TrainingModule {
}
