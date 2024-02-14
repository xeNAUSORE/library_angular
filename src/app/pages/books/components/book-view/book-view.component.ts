import { Component, OnDestroy, OnInit  } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//MAterial
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
//Component
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { BookListComponent } from '../../../../shared/components/book-list/book-list.component'
import { RentalListComponent } from '../../../../shared/components/rental-list/rental-list.component';
//Model
import { Book } from '../../../../shared/models/book';
import { Rental } from '../../../../shared/models/rental';
//Services
import { BooksService } from '../../../../core/services/book/books.service';

@Component({
	selector: 'app-book-view',
	standalone: true,
	imports: [TitlePageComponent, NgIf, BookListComponent, RentalListComponent, MatCardModule, MatListModule, RouterLink, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './book-view.component.html',
	styleUrl: './book-view.component.scss'
})
export class BookViewComponent implements OnDestroy, OnInit{
	////////////////////////////////////////
	// Properties
	isDataLoaded = false
	book!: Book
	
	bookRentals: Rental[] = []
	
	private bookSubscription!: Subscription

	constructor(private booksService: BooksService, private router: Router, private activatedRoute: ActivatedRoute){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/books')
		else {
			const id = parseInt(paramId)
			this.bookSubscription = this.booksService.getBook(id).subscribe({
				next: (data) => { 
					this.book = data 
					this.bookRentals = data.rentals ?? []
					this.isDataLoaded = true
				},
				error: (err) => { this.router.navigateByUrl('/books') }
			})
		}
	}
	ngOnDestroy(): void{
		if(this.bookSubscription)
			this.bookSubscription.unsubscribe()
	}
}
