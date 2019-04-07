import { CourseService } from '../../../../shared/services/course.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../../../shared/models/course';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: [ './courses.component.scss' ]
})
export class CoursesComponent implements OnInit {
	checkoutCourses: Course[];

	totalPrice = 0;
	constructor(courseService: CourseService) {
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'none';

		const courses = courseService.getLocalCartCourses();

		this.checkoutCourses = courses;

		courses.forEach((course) => {
			this.totalPrice += course.coursePrice;
		});
	}

	ngOnInit() {}
}

