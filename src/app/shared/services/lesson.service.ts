import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Course } from 'src/app/shared/models/course';
import { Lesson } from 'src/app/shared/models/lesson';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})

export class LessonService {
  // Class Variables
  lessons: AngularFirestoreCollection<Lesson>;
  lesson:  AngularFirestoreDocument<Lesson>;

  // Initialization of the Database, Authentication and Toastr Service.
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  /* ___________________ Lesson System ___________________*/
  // Obtain all lessons in the course.
  getLessons(courseKey: string){
    this.lessons = this.db.collection('courses').doc(courseKey).collection('lessons');
    return this.lessons;
  }

  // Create a lesson and add it to the course.
  createLesson(courseKey: string, data: Lesson){
    return this.db.collection('courses').doc(courseKey).collection('lessons').add(data);
  }

  // Find a lesson by its ID inside the course.
  getLessonByID(courseKey: string, lessonKey: string){
    this.lesson = this.db.collection('courses').doc(courseKey).collection('lesson').doc(lessonKey);
    return this.lesson;
  }

  // Updates a Lesson
  updateLesson(data: Lesson) {
    //	this.products.update(data.$key, data);
  }
  
  // Deletes a Lesson
  deleteLesson(key: string) {
    //	this.products.remove(key);
  }
  
}
