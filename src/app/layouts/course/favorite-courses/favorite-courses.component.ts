import { Component, OnInit } from '@angular/core';
import { Course } from '../../../shared/models/course';
import { CourseService } from '../../../shared/services/course.service';
@Component({
	selector: 'app-favourite-courses',
	templateUrl: './favourite-courses.component.html',
	styleUrls: [ './favourite-courses.component.scss' ]
})
export class FavouriteCoursesComponent implements OnInit {
	favoruiteCourses: Course[];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No Favourite Courses Found';
	messageDescription = 'Please, choose your favourite courses';

	constructor(private courseService: CourseService) {}

	ngOnInit() {
		this.getFavouriteCourse();
	}
	removeFavourite(course: Course) {
		this.courseService.removeLocalFavorite(course);

		this.getFavouriteCourse();
	}

	getFavouriteCourse() {
		this.favoruiteCourses = this.courseService.getLocalFavouriteCourses();
	}
}

