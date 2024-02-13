import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserListComponent } from './components/user-list/user-list.component';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		UsersRoutingModule,
		UserAddComponent,
		UserEditComponent,
		UserViewComponent,
		UserListComponent
	]
})
export class UsersModule { }
