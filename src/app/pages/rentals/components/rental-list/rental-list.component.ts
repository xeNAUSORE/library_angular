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
	rentals!: Rental[]

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

