import { CartCoursesComponent } from './cart-courses/cart-courses.component';
import { FavoriteCoursesComponent } from './favorite-courses/favorite-courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { Routes } from '@angular/router';
import { IndexComponent } from '../../index/index.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseClassroomComponent } from './course-classroom/course-classroom.component';

export const CourseRoutes: Routes = [
	{
		path: 'courses',
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'all-courses',
				component: CourseListComponent
			},
			{
				path: 'favourite-courses',
				component: FavoriteCoursesComponent
			},
			{
				path: 'cart-items',
				component: CartCoursesComponent
			},
			{
				path: 'checkouts',
				loadChildren: './checkout/checkout.module#CheckoutModule'
			},
			{
				path: 'course/:id',
				component: CourseDetailComponent
			},
			{
				path: 'course/:courseID/lessons/:lessonID/concepts/:conceptID',
				component: CourseClassroomComponent
			}
		]
	}
];
