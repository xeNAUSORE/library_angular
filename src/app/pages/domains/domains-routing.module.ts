import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { DomainListComponent } from './components/domain-list/domain-list.component'
import { DomainViewComponent } from './components/domain-view/domain-view.component'
import { DomainAddComponent } from './components/domain-add/domain-add.component'
import { DomainEditComponent } from './components/domain-edit/domain-edit.component';

const routes: Routes = [
	{
		path: '',
		component: DomainListComponent
	},
	{
		path: 'view/:id',
		component: DomainViewComponent
	},
	{
		path: 'add',
		component: DomainAddComponent
	},
	{
		path: 'edit/:id',
		component: DomainEditComponent
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DomainsRoutingModule { }
