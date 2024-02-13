import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageBookListComponent } from './components/book-list/book-list.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookViewComponent } from './components/book-view/book-view.component';
//Components


const routes: Routes = [
	{
		path: '',
		component: PageBookListComponent
	},
	{
		path: 'view/:id',
		component: BookViewComponent
	},
	{
		path: 'add',
		component: BookAddComponent
	},
	{
		path: 'edit/:id',
		component: BookEditComponent
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BooksRoutingModule { }
