import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//Components
import { RentalFormComponent } from '../rental-form/rental-form.component';
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';
//Services
import { RentalsService } from '../../../../core/services/rentals/rentals.service';
import { BooksService } from '../../../../core/services/book/books.service';
//Model
import { Book } from '../../../../shared/models/book';

@Component({
	selector: 'app-rental-add',
	standalone: true,
	imports: [RentalFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './rental-add.component.html',
	styleUrl: './rental-add.component.scss'
})
export class RentalAddComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	private rentalSubscription!: Subscription
	private bookSubscription!: Subscription
	selectedBook!: Book

	constructor(private rentalsService: RentalsService, private booksService: BooksService,private router: Router,private activatedRoute: ActivatedRoute){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId){
			this.selectedBook= {
				id:1, 
				title:"ça", 
				description:'lorem ipsum doler es du ast.', 
				author: { id:1, firstname:'Stephen', lastname:'King', mail:'', phone:'', books:null },
				domain: { id:1, name:'Science Fiction', description:'', books:null} ,
				rentals: [
					{ 
						id:1, 
						user: {
							id:1,
							firstname:'Xen',
							lastname: 'Ausore',
							mail: 'xenausore@gmail.com',
							phone: '0102030405',
							address: { 
								id:1, 
								number:12, 
								street:'Rue du château',
								apt: '',
								city: 'Nantes',
								zip:'44000',
								country: 'France'
							},
							rentals: null
						},
						book: { 
							id:1, 
							title:"ça", 
							description:'', 
							author: { id:1, firstname:'Stephen', lastname:'King', mail:'', phone:'', books:null },
							domain: { id:1, name:'Science Fiction', description:'', books:null} ,
							rentals: null
						} ,
						rentAt: new Date(),
						returnAt: null
					}
				]
			}
			// const id = parseInt(paramId)
			// this.bookSubscription = this.booksService.getBook(id).subscribe({
			// 	next: (data) => { this.selectedBook = data },
			// 	error: (err) => {  }
			// })
		}
		
	}

	ngOnDestroy(): void{
		if(this.rentalSubscription)
			this.rentalSubscription.unsubscribe()
		if(this.bookSubscription)
			this.bookSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode création de l'auteur emit
	// Emit par le component enfant (rental-form) au submit
	addRental(rental: any){
		this.rentalSubscription = this.rentalsService.createRental(rental).subscribe({
			next: (data) => { this.router.navigateByUrl('/rentals') },
			error: (err) => { this.hasError = true }
		})
	}
}
