import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
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


@Component({
	selector: 'app-book-add',
	standalone: true,
	imports: [BookFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './book-add.component.html',
	styleUrl: './book-add.component.scss'
})
export class BookAddComponent implements OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	private bookSubscription!: Subscription

	constructor(private booksService: BooksService, private router: Router){}

	////////////////////////////////////////
	// LifeCycle
	ngOnDestroy(): void{
		if(this.bookSubscription)
			this.bookSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode création de l'auteur emit
	// Emit par le component enfant (book-form) au submit
	addBook(book: any){
		this.bookSubscription = this.booksService.createBook(book).subscribe({
			next: (data) => { this.router.navigateByUrl('/books') },
			error: (err) => { this.hasError = true }
		})
	}
}
