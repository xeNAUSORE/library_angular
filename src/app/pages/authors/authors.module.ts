import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Routing
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';
import { AuthorViewComponent } from './components/author-view/author-view.component';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AuthorsRoutingModule,
		AuthorAddComponent,
		AuthorListComponent,
		AuthorEditComponent,
		AuthorViewComponent, 
	]
})
export class AuthorsModule { }
