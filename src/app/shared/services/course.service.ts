import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Course } from 'src/app/shared/models/course';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  // Class Variables
  courses: AngularFirestoreCollection<Course>;
  course:  AngularFirestoreDocument<Course>;
  favoriteCourses: AngularFirestoreCollection<FavouriteCourse>;
  cartCourses:     AngularFirestoreDocument<FavouriteCourse>;

  // Navigation Bar Counters
  navbarCartCourseCount = 0;
  navbarFavoriteCourseCount = 0;
  
  // Initialization of the Database, Authentication and Toastr Service.
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
    this.calculateLocalFavouriteCourseCounts();
    this.calculateLocalCartCourseCounts();
  }

  /* ___________________ Course System ___________________*/
  // Obtain all courses in the database.
  getCourses(){
    this.courses = this.db.collection('courses');
    return this.courses;
  }

  // Create a course and add it to the database.
  createCourse(data: Course){
    return this.db.collection('courses').add(data);
  }

  // Find a course by its ID.
  getCourseByID(courseKey: string){
    this.course = this.db.collection('courses').doc(courseKey);
    return this.course;
  }

  // Updates a Course
  updateCourse(data: Course) {
    //	this.products.update(data.$key, data);
  }
  
  // Deletes a Course
  deleteCourse(key: string) {
    //	this.products.remove(key);
  }

  /* ___________________ Favourite System ___________________*/
  // Adding a favourite course.
  addFavouriteCourse(data: Course): void {
    let cour: Course[];
    cour = JSON.parse(localStorage.getItem('avf_item')) || [];
    cour.push(data);

    this.toastrService.wait('Adding Course', 'Adding Course as Favourite');
    setTimeout(() => {
      localStorage.setItem('avf_item', JSON.stringify(cour));
      this.calculateLocalFavouriteCourseCounts();
    }, 1500);
  }

  // Fetching the favourite courses from an unsigned user.
  getLocalFavoriteCourses(): Course[] {
    const courses: Course[] = JSON.parse(localStorage.getItem('avf_item')) || [];
    return courses;
  }

  // Remove a favourite course from an unsigned user.
  removeLocalFavorite(course: Course){
    const courses: Course[] = JSON.parse(localStorage.getItem('avf_item'));
  
    for (let i = 0; i < courses.length; i++){
      if (courses[i].courseID === course.courseID){
        courses.splice(i, 1);
        break;
      }
    }

    localStorage.setItem('avf_item', JSON.stringify(courses));
    this.calculateLocalFavouriteCourseCounts();
  }

  // Calculate Local Favourite Course Count.
  calculateLocalFavouriteCourseCounts(){
    this.navbarFavoriteCourseCount = this.getLocalFavoriteCourses().length;
  }

  /* ___________________ Cart System ___________________*/
  // Adding a cart to LocalStorage
  addCourseToCart(data: Course): void {
    let cour: Course[];
    cour = JSON.parse(localStorage.getItem('avct_item')) || [];
    cour.push(data);

    this.toastrService.wait('Adding Course to Cart', 'Course Adding to the Cart');
    setTimeout(() => {
      localStorage.setItem('avct_item', JSON.stringify(cour));
      this.calculateLocalCartCourseCounts();
    }, 500);
  }

  // Removing a cart item from LocalStorage
  removeLocalCartCourse(course: Course) {
    const courses: Course[] = JSON.parse(localStorage.getItem('avct_item'));

    for (let i = 0; i < courses.length; i++){
      if (courses[i].courseID === course.courseID) {
        courses.splice(i, 1);
        break;
      }
    }

    localStorage.setItem('avct_item', JSON.stringify(courses));
    this.calculateLocalCartCourseCounts();
  }

  // Fetching Local Cart Courses from an unsigned user.
  getLocalCartCourses(): Course[] {
    const courses: Course[] = JSON.parse(localStorage.getItem('avct_item')) || [];
    return courses;
  }

  // Calculate Local Cart Course Count.
  calculateLocalCartCourseCounts(){
    this.navbarCartCourseCount = this.getLocalCartCourses().length;
  }
}

export class FavouriteCourse {
	course: Course;
	courseID: string;
	userId: string; 
}
