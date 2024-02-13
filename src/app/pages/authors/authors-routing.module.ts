import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorViewComponent } from './components/author-view/author-view.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';

const routes: Routes = [
	{
		path: '',
		component: AuthorListComponent
	},
	{
		path: 'view/:id',
		component: AuthorViewComponent
	},
	{
		path: 'add',
		component: AuthorAddComponent
	},
	{
		path: 'edit/:id',
		component: AuthorEditComponent
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthorsRoutingModule { }
