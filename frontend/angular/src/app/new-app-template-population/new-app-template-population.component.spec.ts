import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppTemplatePopulationComponent } from './new-app-template-population.component';

describe('NewAppTemplatePopulationComponent', () => {
  let component: NewAppTemplatePopulationComponent;
  let fixture: ComponentFixture<NewAppTemplatePopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAppTemplatePopulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppTemplatePopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
