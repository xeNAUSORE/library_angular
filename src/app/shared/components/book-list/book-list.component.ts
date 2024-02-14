import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router'
import { NgFor, NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//MAterial
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
//Model
import { Book } from '../../models/book';
//Shared
import { SearchComponent } from '../search/search.component';
import { ErrorCardComponent } from '../error-card/error-card.component';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';
//Service
import { BooksService } from '../../../core/services/book/books.service';
//Pipe
import { SearchPipe } from '../../pipes/search.pipe';
//component
import { EmptyResultCardComponent } from '../empty-result-card/empty-result-card.component';

@Component({
	selector: 'app-book-list',
	standalone: true,
	imports: [SearchComponent, EmptyResultCardComponent, ErrorCardComponent, SearchPipe, MatCardModule, MatListModule, RouterLink, NgFor,NgIf, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './book-list.component.html',
	styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit, OnDestroy {
	@Input() books: Book[] = []

	hasError: boolean = false
	searchText: string = ''

	private bookSubscription!: Subscription

	constructor(private booksService: BooksService, private dialog: MatDialog){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
	}
	ngOnDestroy(): void{
		if(this.bookSubscription)
			this.bookSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode delete de domain 
	deleteAuthor(id: number){
		this.bookSubscription = this.booksService.deleteBook(id).subscribe({
			next: (data) => {  },
			error: (err) => { this.hasError = true }
		})
	}
	////////////////////////////////////////
	// Méthode search  domain  emit par le component search
	searchBook(search: string){
		this.searchText = search
	}

	////////////////////////////////////////
	//Open confirm delete
	openDialog(book: Book) {
		const dialogRef = this.dialog.open(ModalConfirmDeleteComponent,{
			data:{
				title: 'un livre',
				message: `le livre ${book.title}`,
			}
		});

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
		  	if (confirmed) {
				this.deleteAuthor(book.id)
				dialogRef.close();
		  	}
		});
	}
}
