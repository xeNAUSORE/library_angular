import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
//Components

const routes: Routes = [
	{
		path: '',
		component: UserListComponent
	},
	{
		path: 'view/:id',
		component: UserViewComponent
	},
	{
		path: 'add',
		component: UserAddComponent
	},
	{
		path: 'edit/:id',
		component: UserEditComponent
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }
