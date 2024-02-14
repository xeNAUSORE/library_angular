import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'
//RX
import { Subscription } from 'rxjs'
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
//Model
import { Book } from '../../../../shared/models/book';
//Service
import { BooksService } from '../../../../core/services/book/books.service';
import { BookListComponent } from '../../../../shared/components/book-list/book-list.component';

@Component({
	selector: 'app-page-book-list',
	standalone: true,
	imports: [TitlePageComponent,RouterLink,BookListComponent],
	templateUrl: './book-list.component.html',
	styleUrl: './book-list.component.scss'
})
export class PageBookListComponent implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	books: Book[] = [
		{ 
			id:1, 
			title:"ça", 
			description:'', 
			author: { id:1, firstname:'Stephen', lastname:'King',email:'', grade:'', phone:'', books:null },
			domain: { id:1, name:'Science Fiction', description:'', books:null} ,
			rentals: null
		}
	]

	private bookSubscription!: Subscription

	constructor(private booksService: BooksService){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//this.bookSubscription = this.booksService.getBookList().subscribe(v => this.books = v)
	}
	ngOnDestroy(): void{
		if(this.bookSubscription)
			this.bookSubscription.unsubscribe()
	}

}

