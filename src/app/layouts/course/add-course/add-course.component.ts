import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseService } from 'src/app/shared/services/course.service';
import { NgForm } from '@angular/forms';

// Declaration of helpful items.
declare var $: any;
declare var require: any;
declare var toastr: any;
const shortID = require('shortid');

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  // Class Variables
  course: Course = new Course();

  // Obtain the CourseService
  constructor(private courseService: CourseService) { }

  ngOnInit() {
  }

  // Create a Course
  createCourse(courseForm: NgForm) {
    courseForm.value['favourite'] = false;
    courseForm.value['courseID'] = 'COUR_' + shortID.generate();
    courseForm.value['courseRating'] = 5;
    if (courseForm.value['coursePrice'] === undefined)
      courseForm.value['coursePrice'] = 0;
    if (courseForm.value['courseImage'] === undefined)
      courseForm.value['courseImage'] = 'http://via.placeholder.com/640x360/007bff/ffffff';
    
    this.courseService.createCourse(courseForm.value);
    this.course = new Course();
    
    $('#exampleModalLong').modal('hide');
    toastr.success('Course' + courseForm.value['courseName'] + 'was added successfully.', 'Course Creation');
  }

}
