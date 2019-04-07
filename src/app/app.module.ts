import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { TranslateService } from './shared/services/translate.service';
import { ProductModule } from './layouts/product/product.module';
import { UserModule } from './layouts/user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxSoapModule } from 'ngx-soap';
import { CourseComponent } from './layouts/course/course.component';
import { AddCourseComponent } from './layouts/course/add-course/add-course.component';
import { BestCourseComponent } from './layouts/course/best-course/best-course.component';
import { CartCalculatorComponent } from './layouts/course/cart-calculator/cart-calculator.component';
import { CartCoursesComponent } from './layouts/course/cart-courses/cart-courses.component';
import { CheckoutComponent } from './layouts/course/checkout/checkout.component';
import { FavoriteCoursesComponent } from './layouts/course/favorite-courses/favorite-courses.component';
import { BillingDetailsComponent } from './layouts/course/checkout/billing-details/billing-details.component';
import { CheckoutNavbarComponent } from './layouts/course/checkout/checkout-navbar/checkout-navbar.component';
import { CoursesComponent } from './layouts/course/checkout/courses/courses.component';
import { ResultComponent } from './layouts/course/checkout/result/result.component';
import { ShippingDetailsComponent } from './layouts/course/checkout/shipping-details/shipping-details.component';

/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}

@NgModule({
	declarations: [ AppComponent, CourseComponent, AddCourseComponent, BestCourseComponent, CartCalculatorComponent, CartCoursesComponent, CheckoutComponent, FavoriteCoursesComponent, BillingDetailsComponent, CheckoutNavbarComponent, CoursesComponent, ResultComponent, ShippingDetailsComponent],
	imports: [
		NgxSoapModule,
		BrowserModule,
		BrowserAnimationsModule,
		IndexModule,
		ProductModule,
		UserModule,
		SharedModule,
		RouterModule.forRoot(AppRoutes),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		TranslateService,
		
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [ TranslateService ],
			multi: true
		}
	],
	bootstrap: [ AppComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
