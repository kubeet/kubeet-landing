import { Component, OnInit } from '@angular/core';
import { Course } from '../../../shared/models/course';
import { CourseService } from '../../../shared/services/course.service';
@Component({
	selector: 'app-favorite-courses',
	templateUrl: './favorite-courses.component.html',
	styleUrls: [ './favorite-courses.component.scss' ]
})
export class FavoriteCoursesComponent implements OnInit {
	favoriteCourses: Course[];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No Favorite Courses Found';
	messageDescription = 'Please, choose your favorite courses';

	constructor(private courseService: CourseService) {}

	ngOnInit() {
		this.getFavoriteCourse();
	}
	removeFavorite(course: Course) {
		this.courseService.removeLocalFavorite(course);

		this.getFavoriteCourse();
	}

	getFavoriteCourse() {
		this.favoriteCourses = this.courseService.getLocalFavoriteCourses();
	}
}

