import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppTempleateSelectionComponent } from './new-app-templeate-selection.component';

describe('NewAppTempleateSelectionComponent', () => {
  let component: NewAppTempleateSelectionComponent;
  let fixture: ComponentFixture<NewAppTempleateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAppTempleateSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppTempleateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
