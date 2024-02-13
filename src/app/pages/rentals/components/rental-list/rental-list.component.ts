import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'
//RX
import { Subscription } from 'rxjs'
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
//Model
import { Rental } from '../../../../shared/models/rental';
//Service
import { RentalsService } from '../../../../core/services/rentals/rentals.service';
import { RentalListComponent } from '../../../../shared/components/rental-list/rental-list.component';

@Component({
	selector: 'app-page-rental-list',
	standalone: true,
	imports: [TitlePageComponent, RouterLink, RentalListComponent],
	templateUrl: './rental-list.component.html',
	styleUrl: './rental-list.component.scss'
})
export class PageRentalListComponent  implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	rentals: Rental[] = [
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
				author: { id:1, firstname:'Stephen', lastname:'King',email:'', grade:'', phone:'', books:null },
				domain: { id:1, name:'Science Fiction', description:'', books:null} ,
				rentals: null
			} ,
			rentAt: new Date(),
			returnAt: null
		}
	]

	private rentalSubscription!: Subscription

	constructor(private rentalService: RentalsService){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//this.rentalSubscription = this.rentalsService.getRentalList().subscribe(v => this.rentals = v)
	}
	ngOnDestroy(): void{
		if(this.rentalSubscription)
			this.rentalSubscription.unsubscribe()
	}

}

