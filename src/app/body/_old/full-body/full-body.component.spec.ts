import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBodyComponent } from './full-body.component';

describe('FullBodyComponent', () => {
  let component: FullBodyComponent;
  let fixture: ComponentFixture<FullBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
