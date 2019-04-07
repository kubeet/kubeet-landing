// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// Configuration and services
import { CourseRoutes } from "./course.routing";

// Components
import { CheckoutModule } from "./checkout/checkout.module";
import { CourseComponent } from "./course.component";
import { BestCourseComponent } from "./best-course/best-course.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { FavouriteCoursesComponent } from "./favorite-courses/favorite-courses.component";
import { CartCoursesComponent } from "./cart-courses/cart-courses.component";
import { CartCalculatorComponent } from "./cart-calculator/cart-calculator.component";

@NgModule({
	imports: [CommonModule, RouterModule.forChild(CourseRoutes), SharedModule, CheckoutModule],
	declarations: [
		CourseComponent,
		BestCourseComponent,
		CourseListComponent,
		AddCourseComponent,
		CourseDetailComponent,
		FavouriteCoursesComponent,
		CartCoursesComponent,
		CartCalculatorComponent
	],
	exports: [BestCourseComponent]
})
export class CourseModule { }