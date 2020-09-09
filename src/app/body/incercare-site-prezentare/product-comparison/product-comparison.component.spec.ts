import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductComparisonComponent} from './product-comparison.component';

describe('ProductComparisonComponent', () => {
  let component: ProductComparisonComponent;
  let fixture: ComponentFixture<ProductComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
