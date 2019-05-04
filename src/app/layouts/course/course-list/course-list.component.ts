import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  // Class Variables
  courseList: Course[];
  courseObject: Course;
  loading = false;
  page = 1;
  
  // Constructor
  constructor(
    public authService: AuthService,
    private courseService: CourseService,
    private toastrService: ToastrService
  ) { }

  // Initialization
  ngOnInit() {
    this.getAllCourses();
  }

  // Gets all courses available.
  getAllCourses() {
    this.loading = true;
    const cour = this.courseService.getCourses();
    cour.snapshotChanges().subscribe(
      (course) => {
        this.loading = true;
        this.courseList = [];
        course.forEach((element => {
          this.courseObject = element.payload.doc.data();
          this.courseObject.$key = element.payload.doc.id;
          this.courseList.push(this.courseObject as Course);
        }));
      },
      (err) => {
        this.toastrService.error('Error while fetching Courses', err);
      }
    );
  }

  // Removes a Course
  removeCourse(key: string){
    this.courseService.deleteCourse(key);
  }

  // Adds a course as favorite.
  addFavourite(course: Course){
    this.courseService.addFavouriteCourse(course);
  }

  // Adds a course to the cart.
  addToCart(course: Course){
    this.courseService.addCourseToCart(course);
  }

}
