import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-best-course',
  templateUrl: './best-course.component.html',
  styleUrls: ['./best-course.component.scss']
})
export class BestCourseComponent implements OnInit {
  // Class Variables
  bestCourses: Course[] = [];
  courseObject: Course;
  options: any;
  loading = false;

  // Load necessary services.
  constructor(
    private courseService: CourseService,
    private toastrService: ToastrService,
    public translate: TranslateService
  ) { }

  // Define the options.
  ngOnInit() {
    this.options = {
			dots: false,
			responsive: {
				'0': { items: 1, margin: 5 },
				'430': { items: 2, margin: 5 },
				'550': { items: 3, margin: 5 },
				'670': { items: 4, margin: 5 }
			},
			autoplay: true,
			loop: true,
			autoplayTimeout: 3000,
			lazyLoad: true
    };
    this.getAllCourses();
  }

  // Get All Courses.
  getAllCourses() {
    this.loading = true;
    const cour = this.courseService.getCourses();

    cour.snapshotChanges().subscribe(
      (course) => {
        this.loading = false;
        this.bestCourses = [];
        for (let i=0; i<5; i++){
          this.courseObject = course[i].payload.doc.data();
          this.courseObject.$key = course[i].payload.doc.id;
          console.log("Best data: " + this.courseObject.$key);
          this.bestCourses.push(this.courseObject as Course);
        }
      },
      (error) => {
        this.toastrService.error('Error while fetching Courses', error);
      }
    )
  }
}
