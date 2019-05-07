import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/models/lesson';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { NgForm } from '@angular/forms';


// Declaration of helpful items.
declare var $: any;
declare var require: any;
declare var toastr: any;
const shortID = require('shortid');

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {

  // Class Variables
  lesson: Lesson = new Lesson();
  @Input() courseKey: string

  // Obtain the LessonService
  constructor(private lessonService: LessonService) { }

  ngOnInit() {
  }

  // Create a Lesson
  createLesson(lessonForm: NgForm) {
    lessonForm.value['favourite'] = false;
    lessonForm.value['lessonID'] = 'COUR_' + shortID.generate();
    lessonForm.value['lessonRating'] = 5;
    if (lessonForm.value['lessonPrice'] === undefined)
      lessonForm.value['lessonPrice'] = 0;
    if (lessonForm.value['lessonImage'] === undefined)
      lessonForm.value['lessonImage'] = 'http://via.placeholder.com/640x360/007bff/ffffff';
    
    this.lessonService.createLesson(this.courseKey, lessonForm.value);
    this.lesson = new Lesson();
    
    $('#exampleModalLong').modal('hide');
    toastr.success('Lesson' + lessonForm.value['lessonName'] + 'was added successfully.', 'Lesson Creation');
  }

}

