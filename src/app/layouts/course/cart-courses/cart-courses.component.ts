import { Component, OnInit } from '@angular/core';
import { Course } from '../../../shared/models/course';
import { CourseService } from '../../../shared/services/course.service';
@Component({
	selector: 'app-cart-courses',
	templateUrl: './cart-courses.component.html',
	styleUrls: [ './cart-courses.component.scss' ]
})
export class CartCoursesComponent implements OnInit {
	cartCourses: Course[];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No Courses Found in Cart';
	messageDescription = 'Please, Add Courses to Cart';

	constructor(private courseService: CourseService) {}

	ngOnInit() {
		this.getCartCourse();
	}

	removeCartCourse(course: Course) {
		this.courseService.removeLocalCartCourse(course);

		// Recalling
		this.getCartCourse();
	}

	getCartCourse() {
		this.cartCourses = this.courseService.getLocalCartCourses();
	}
}

