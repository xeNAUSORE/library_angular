import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
//Material
import { MatIconModule } from '@angular/material/icon';
//RX
import { Subscription } from 'rxjs'
//Components
import { RentalFormComponent } from '../rental-form/rental-form.component';
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';
//Services
import { RentalsService } from '../../../../core/services/rentals/rentals.service';
//Model
import { Rental } from '../../../../shared/models/rental';

@Component({
	selector: 'app-rental-edit',
	standalone: true,
	imports: [RentalFormComponent, TitlePageComponent, ErrorCardComponent, NgIf, DatePipe, MatIconModule],
	templateUrl: './rental-edit.component.html',
	styleUrl: './rental-edit.component.scss'
})
export class RentalEditComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	private rentalSubscription!: Subscription

	//pour test sans API
	rental: Rental = { 
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
			author: { id:1, firstname:'Stephen', lastname:'King',email:'', grade:'', phone:'', books:null },
			domain: { id:1, name:'Science Fiction', description:'', books:null} ,
			rentals: null
		},
		rentAt: new Date(),
		returnAt: null
	}

	constructor(private rentalsService: RentalsService, private router: Router, private activatedRoute: ActivatedRoute){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/rentals')
		else {
			// const id = parseInt(paramId)
			// this.rentalSubscription = this.rentalsService.getRental(id).subscribe({
			// 	next: (data) => { this.rental = data },
			// 	error: (err) => { this.router.navigateByUrl('/books') }
			// })
		}
	}

	ngOnDestroy(): void{
		if(this.rentalSubscription)
			this.rentalSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode édition  emit
	// Emit par le component enfant (rental-form) au submit
	editRental(rental: any){
		this.rentalSubscription = this.rentalsService.editRental(rental).subscribe({
			next: (data) => { this.router.navigateByUrl('/rentals') },
			error: (err) => { this.hasError = true }
		})
	}
}
