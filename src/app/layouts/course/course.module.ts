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
import { FavoriteCoursesComponent } from "./favorite-courses/favorite-courses.component";
import { CartCoursesComponent } from "./cart-courses/cart-courses.component";
import { CartCalculatorComponent } from "./cart-calculator/cart-calculator.component";
import { CourseClassroomComponent } from './course-classroom/course-classroom.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { AddConceptComponent } from './add-concept/add-concept.component';

@NgModule({
	imports: [CommonModule, RouterModule.forChild(CourseRoutes), SharedModule, CheckoutModule],
	declarations: [
		CourseComponent,
		BestCourseComponent,
		CourseListComponent,
		AddCourseComponent,
		CourseDetailComponent,
		FavoriteCoursesComponent,
		CartCoursesComponent,
		CartCalculatorComponent,
		CourseClassroomComponent,
		CourseLessonComponent,
		AddLessonComponent,
		AddConceptComponent,
	],
	exports: [BestCourseComponent]
})
export class CourseModule { }