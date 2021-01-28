import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewTrainingComponent } from './new-training.component';

describe('NewTrainingComponent', () => {
  let component: NewTrainingComponent;
  let fixture: ComponentFixture<NewTrainingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
