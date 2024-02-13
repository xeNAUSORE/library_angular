import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Routing
import { RentalsRoutingModule } from './rentals-routing.module';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalEditComponent } from './components/rental-edit/rental-edit.component';
import { RentalViewComponent } from './components/rental-view/rental-view.component';
import { PageRentalListComponent } from './components/rental-list/rental-list.component';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RentalsRoutingModule,
		RentalAddComponent,
		RentalEditComponent,
		RentalViewComponent,
		PageRentalListComponent
	]
})
export class RentalsModule { }
