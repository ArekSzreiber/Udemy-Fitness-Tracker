import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PastTrainingsComponent } from './past-trainings.component';

describe('PastTrainingsComponent', () => {
  let component: PastTrainingsComponent;
  let fixture: ComponentFixture<PastTrainingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
