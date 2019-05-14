import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { Lesson } from 'src/app/shared/models/lesson';
import { Concept} from 'src/app/shared/models/concept';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/services/course.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { ConceptService} from 'src/app/shared/services/concept.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-course-lesson',
  templateUrl: './course-lesson.component.html',
  styleUrls: ['./course-lesson.component.scss']
})
export class CourseLessonComponent implements OnInit {
  // Class variables
  private sub: any;
  course: Course;
  courseKey: string;
  lesson: Lesson;
  lessonKey: string;
  concepts: Concept[];
  loading: boolean

  // Constructor
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private lessonService: LessonService,
    private conceptService: ConceptService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {
    this.course = new Course();
    this.lesson = new Lesson();
    this.concepts = [];
    this.loading = false;
  }

  // Initialization
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.courseKey = params['courseID'];
      this.lessonKey = params['lessonID'];
      this.getCourseDetails();
      this.getLessonDetails();
      this.getAllConcepts();
      this.loading = true;
    });
  }

  // Destroy
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  // CourseDetails
  getCourseDetails() {
    const cour = this.courseService.getCourseByID(this.courseKey);
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

  // Lesson Details
  getLessonDetails(){
    const less = this.lessonService.getLessonByID(this.courseKey, this.lessonKey);

    less.snapshotChanges().subscribe(
      (lesson) => {
        this.lesson = lesson.payload.data();
      },
      (error) => {
        this.toastrService.error('Error while fetching Lesson details.', error);
      }
    );
  }

   // Obtain all concepts.
   getAllConcepts(){
    const conc = this.conceptService.getConcepts(this.courseKey, this.lessonKey);
    this.concepts = [];
    var conceptAux: Concept;

    conc.snapshotChanges().subscribe(
      (concept) => {
        this.concepts = [];
        for (let i=0; i<concept.length; i++){
          conceptAux      = concept[i].payload.doc.data();
          conceptAux.$key = concept[i].payload.doc.id;
          this.concepts.push(conceptAux);
        }
      },
      (error) => {
        this.toastrService.error('Error while fetching Concepts.', error);
      }
    );
  }

  // Removes a Concept
  removeConcept(key: string){
    this.conceptService.deleteConcept(this.courseKey, this.lessonKey, key);
  }

}
