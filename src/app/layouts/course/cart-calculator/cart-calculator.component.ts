import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Course } from '../../../shared/models/course';

@Component({
	selector: 'app-cart-calculator',
	templateUrl: './cart-calculator.component.html',
	styleUrls: [ './cart-calculator.component.scss' ]
})
export class CartCalculatorComponent implements OnInit, OnChanges {
	@Input() courses: Course[];

	totalValue = 0;
	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		const dataChanges: SimpleChange = changes.courses;

		const courses: Course[] = dataChanges.currentValue;
		this.totalValue = 0;
		courses.forEach((course) => {
			this.totalValue += course.coursePrice;
		});
	}

	ngOnInit() {}
}

