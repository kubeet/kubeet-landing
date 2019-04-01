import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';

// Declaration of helpful items.
declare var $: any;
declare var require: any;
declare var toastsr: any;
const shortID = require('shortid');
const moment = require('moment');

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  // Class Variables
  course: Course = new Course();

  // Obtain the CourseService
  constructor() { }

  ngOnInit() {
  }

}
