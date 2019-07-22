import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { Lesson } from 'src/app/shared/models/lesson';
import { CourseService } from 'src/app/shared/services/course.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  // Class variables
  private sub: any;
  course: Course;
  courseKey: string;
  lessons: Lesson[];
  lessonObject: Lesson;
  
  // Constructor
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private lessonService: LessonService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { this.course = new Course(); }

  // Initialization
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.courseKey = id;
      this.getCourseDetail(id);
      this.getAllLessons(id);
    });
  }

  // Get the details of a Course.
  getCourseDetail(id: string) {
    const cour = this.courseService.getCourseByID(id);
    //console.log("id:" + id);
    cour.snapshotChanges().subscribe(
      (course) => {
        this.course = course.payload.data();
      }, 
      (error) => {
        this.toastrService.error('Error while fecthing Course Details.', error);
      }
    );
  }

  // Add course to cart.
  addCourseToCart(course: Course){
    this.courseService.addCourseToCart(course);
  }

  // Unsubscribe when destroyed.
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  // ____________________ Lesson Related ____________________
  getAllLessons(id: string){
    const less = this.lessonService.getLessons(id);

    less.snapshotChanges().subscribe(
      (lesson) => {
        this.lessons = [];
        for (let i=0; i<lesson.length; i++){
          this.lessonObject = lesson[i].payload.doc.data();
          this.lessonObject.$key = lesson[i].payload.doc.id;
          this.lessons.push(this.lessonObject);
        }
        this.lessons.sort(function(obj1, obj2) {
          // Ascending: first age less than the previous
          return obj1.lessonIndex - obj2.lessonIndex;
        });
      },
      (error) => {
        this.toastrService.error('Error while fetching Lessons', error);
      }
    )
  }

  // Removes a Lesson
  removeLesson(key: string){
    this.lessonService.deleteLesson(this.courseKey, key);
  }

}
