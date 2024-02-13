import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//Components
import { BookFormComponent } from '../book-form/book-form.component';
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';
//Services
import { BooksService } from '../../../../core/services/book/books.service';
//Model
import { Book } from '../../../../shared/models/book';

@Component({
	selector: 'app-book-edit',
	standalone: true,
	imports: [BookFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './book-edit.component.html',
	styleUrl: './book-edit.component.scss'
})
export class BookEditComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	private bookSubscription!: Subscription

	//pour test sans API
	book: Book = { 
		id:1, title:'ça', 
		description:'ça ça ça', 
		author: { id:1, firstname:'stephen', lastname:'king', mail:'', phone:'', books:null },
		domain: { id:1, name:'Science fiction', description:'', books:null },
		rentals: null
	}

	constructor(private booksService: BooksService, private router: Router, private activatedRoute: ActivatedRoute){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/books')
		else {
			// const id = parseInt(paramId)
			// this.bookSubscription = this.booksService.getBook(id).subscribe({
			// 	next: (data) => { this.bool = data },
			// 	error: (err) => { this.router.navigateByUrl('/books') }
			// })
		}
	}

	ngOnDestroy(): void{
		if(this.bookSubscription)
			this.bookSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode édition  emit
	// Emit par le component enfant (book-form) au submit
	editBook(book: any){
		this.bookSubscription = this.booksService.editBook(book).subscribe({
			next: (data) => { this.router.navigateByUrl('/books') },
			error: (err) => { this.hasError = true }
		})
	}
}
