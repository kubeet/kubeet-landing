import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { TranslateService } from './shared/services/translate.service';
//import { ProductModule } from './layouts/product/product.module';
import { CourseModule } from './layouts/course/course.module';
import { UserModule } from './layouts/user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxSoapModule } from 'ngx-soap';
import { MessagingService } from './shared/messaging.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireStorage } from '@angular/fire/storage';
import { AsyncPipe } from '../../node_modules/@angular/common';


/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		NgxSoapModule,
		BrowserModule,
		BrowserAnimationsModule,
		IndexModule,
		//ProductModule,
		CourseModule,
		UserModule,
		SharedModule,
		RouterModule.forRoot(AppRoutes),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		TranslateService,
		MessagingService,
		AsyncPipe,
		AngularFireMessaging,
		AngularFireStorage,
		
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
