import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSmallComponent } from './customer-small.component';

describe('CustomerSmallComponent', () => {
  let component: CustomerSmallComponent;
  let fixture: ComponentFixture<CustomerSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSmallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
