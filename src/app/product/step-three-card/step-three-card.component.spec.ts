import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepThreeCardComponent } from './step-three-card.component';

describe('StepThreeCardComponent', () => {
  let component: StepThreeCardComponent;
  let fixture: ComponentFixture<StepThreeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepThreeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepThreeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
