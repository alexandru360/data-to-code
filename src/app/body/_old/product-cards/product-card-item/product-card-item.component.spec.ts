import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductCardItemComponent} from './product-card-item.component';

describe('ProductCardItemComponent', () => {
  let component: ProductCardItemComponent;
  let fixture: ComponentFixture<ProductCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
