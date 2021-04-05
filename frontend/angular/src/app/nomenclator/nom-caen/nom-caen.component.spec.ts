import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomCaenComponent } from './nom-caen.component';

describe('NomCaenComponent', () => {
  let component: NomCaenComponent;
  let fixture: ComponentFixture<NomCaenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomCaenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomCaenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
