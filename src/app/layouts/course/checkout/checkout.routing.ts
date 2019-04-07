import { CheckoutComponent } from './checkout.component';
import { ResultComponent } from './result/result.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { CoursesComponent } from './courses/courses.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/auth_gaurd';

export const checkoutRoutes: Routes = [
	{
		path: 'checkouts',
		component: CheckoutComponent,
		canActivate: [ AuthGuard ],
		children: [
			{
				path: '',
				component: CoursesComponent,
				outlet: 'checkOutlet'
			},
			{
				path: 'shipping-details',
				component: ShippingDetailsComponent,
				outlet: 'checkOutlet'
			},
			{
				path: 'billing-details',
				component: BillingDetailsComponent,
				outlet: 'checkOutlet'
			},
			{
				path: 'result',
				component: ResultComponent,
				outlet: 'checkOutlet'
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(checkoutRoutes) ],
	exports: [ RouterModule ]
})
export class CheckoutRoutingModule {}