import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCoursesComponent } from './favorite-courses.component';

describe('FavoriteCoursesComponent', () => {
  let component: FavoriteCoursesComponent;
  let fixture: ComponentFixture<FavoriteCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
