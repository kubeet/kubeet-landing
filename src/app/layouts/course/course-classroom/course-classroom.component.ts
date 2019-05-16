// Angular Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Model Imports
import { Course }  from 'src/app/shared/models/course';
import { Lesson }  from 'src/app/shared/models/lesson';
import { Concept } from 'src/app/shared/models/concept';

// Service Imports
import { CourseService }  from 'src/app/shared/services/course.service';
import { LessonService }  from 'src/app/shared/services/lesson.service';
import { ConceptService } from 'src/app/shared/services/concept.service';
import { ToastrService }  from 'src/app/shared/services/toastr.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-classroom',
  templateUrl: './course-classroom.component.html',
  styleUrls: ['./course-classroom.component.scss']
})
export class CourseClassroomComponent implements OnInit {
  // Definition of variables
  sub:        any;
  courseKey:  string;
  lessonKey:  string;
  conceptKey: string;
  course:     Course;
  lesson:     Lesson;
  concept:    Concept;
  concepts:   Concept[];
  options: any;
  loading = false;

  // Constructor
  constructor(  
    private route: ActivatedRoute,
    private toastrService:  ToastrService,
    private courseService:  CourseService,
    private lessonService:  LessonService,
    private conceptService: ConceptService,
    private sanitizer:      DomSanitizer
  ) {
    this.course = new Course();
    this.lesson = new Lesson();
    this.concept = new Concept();
    this.concepts = [];
  }

  // Initialization
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

    this.sub = this.route.params.subscribe((params) => {
      // Storing the parameters given by the router.
      this.courseKey  = params['courseID'];
      this.lessonKey  = params['lessonID'];
      this.conceptKey = params['conceptID'];

      // Filling the model variables.
      this.getCourseDetails();
      this.getLessonDetails();
      this.getAllConcepts();
      this.getConceptDetails();
      this.loading = true;
    })
  }

  // Unsubscribe when destroyed.
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  // Course Details
  getCourseDetails(){
    const cour = this.courseService.getCourseByID(this.courseKey);

    cour.snapshotChanges().subscribe(
      (course) => {
        this.course = course.payload.data();
      },
      (error) => {
        this.toastrService.error('Error while fetching Course details.', error);
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

  // Concept Details if possible (conceptID is not 0)
  getConceptDetails(){
    const conc = this.conceptService.getConceptByID(this.courseKey, this.lessonKey, this.conceptKey);

    conc.snapshotChanges().subscribe(
      (concept) => {
        this.concept = concept.payload.data();
      },
      (error) => {
        this.toastrService.error('Error while fetching Concept details.', error);
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
        for (let i=0; i<concept.length; i++){
          conceptAux      = concept[i].payload.doc.data();
          conceptAux.$key = concept[i].payload.doc.id;
          this.concepts.push(conceptAux);
        }
        this.concepts.sort(function(obj1, obj2) {
          // Ascending: first age less than the previous
          return obj1.conceptIndex - obj2.conceptIndex;
        });
      },
      (error) => {
        this.toastrService.error('Error while fetching Concepts.', error);
      }
    );
  }

  // Sanitized url to prevent attacks
  videoUrl() : SafeResourceUrl{
    if (this.concept.conceptType === 'File')
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.concept.conceptFile);
    else
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.concept.conceptVideo);
  }
}
