import { CourseService } from '../../../../shared/services/course.service';
import { Course } from '../../../../shared/models/course';
import { BillingService } from '../../../../shared/services/billing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserDetail } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-billing-details',
	templateUrl: './billing-details.component.html',
	styleUrls: [ './billing-details.component.scss' ]
})
export class BillingDetailsComponent implements OnInit {
	userDetails: User;
	courses: Course[];
	userDetail: UserDetail;

	constructor(
		authService: AuthService,
		private billingService: BillingService,
		courseService: CourseService,
		private router: Router
	) {
		/* Hiding Shipping Tab Element */
		document.getElementById('coursesTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'block';
		document.getElementById('resultTab').style.display = 'none';

		this.userDetail = new UserDetail();
		this.courses = courseService.getLocalCartCourses();
		this.userDetails = authService.getLoggedInUser();
	}

	ngOnInit() {}

	updateUserDetails(form: NgForm) {
		const data = form.value;

		data['emailId'] = this.userDetails.emailId;
		data['userId'] = this.userDetails.$key;
		let totalPrice = 0;
		const courses = [];
		this.courses.forEach((course) => {
			delete course['$key'];
			totalPrice += course.coursePrice;
			courses.push(course);
		});

		data['courses'] = courses;

		data['totalPrice'] = totalPrice;

		data['billingDate'] = Date.now();

		this.billingService.createBillings(data);

		this.router.navigate([ 'checkouts', { outlets: { checkOutlet: [ 'result' ] } } ]);
	}
}
