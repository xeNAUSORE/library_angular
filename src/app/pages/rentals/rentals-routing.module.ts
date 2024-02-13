import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { PageRentalListComponent } from './components/rental-list/rental-list.component';
import { RentalViewComponent } from './components/rental-view/rental-view.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalEditComponent } from './components/rental-edit/rental-edit.component';

const routes: Routes = [
	{
		path: '',
		component: PageRentalListComponent
	},
	{
		path: 'view/:id',
		component: RentalViewComponent
	},
	{
		path: 'add',
		component: RentalAddComponent
	},
	{
		path: 'add/:id',
		component: RentalAddComponent
	},
	{
		path: 'edit/:id',
		component: RentalEditComponent
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RentalsRoutingModule { }
