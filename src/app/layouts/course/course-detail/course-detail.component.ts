import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { CourseService } from 'src/app/shared/services/course.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  // Class variables
  private sub: any;
  course: Course;
  
  // Constructor
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private toastrService: ToastrService
  ) { this.course = new Course(); }

  // Initialization
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getCourseDetail(id);
    });
  }

  // Get the details of a Course.
  getCourseDetail(id: string) {
    const cour = this.courseService.getCourseByID(id);
    //console.log("id:" + id);
    cour.snapshotChanges().subscribe(
      (course) => {
        //console.log("Course" + course);
        this.course = course.payload.data();
      }, 
      (error) => {
        this.toastrService.error('Error while fecthing Course Details.', error);
      }
    );
  }

  // Add course to cart.
  addToCart(course: Course){
    this.courseService.addCourseToCart(course);
  }

  // Unsubscribe when destroyed.
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  // ____________________ Lesson Related ____________________

}
