import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrentTrainingComponent } from './current-training.component';

describe('CurrentTrainingComponent', () => {
  let component: CurrentTrainingComponent;
  let fixture: ComponentFixture<CurrentTrainingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
