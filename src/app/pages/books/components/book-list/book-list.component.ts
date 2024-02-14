import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common';
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
	imports: [TitlePageComponent,RouterLink,BookListComponent, NgIf],
	templateUrl: './book-list.component.html',
	styleUrl: './book-list.component.scss'
})
export class PageBookListComponent implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	isDataLoaded: boolean = false
	hasError: boolean = false
	books!: Book[]

	private bookSubscription!: Subscription

	constructor(private booksService: BooksService){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		this.bookSubscription = this.booksService.getBookList().subscribe({
			next: (data) => {
				this.books = data
				this.isDataLoaded = true
			},
			error: (err) => { }
		})
	}
	ngOnDestroy(): void{
		if(this.bookSubscription)
			this.bookSubscription.unsubscribe()
	}

}

