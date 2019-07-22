import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCoursesComponent } from './cart-courses.component';

describe('CartCoursesComponent', () => {
  let component: CartCoursesComponent;
  let fixture: ComponentFixture<CartCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
