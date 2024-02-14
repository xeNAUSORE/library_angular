import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common';
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
	imports: [TitlePageComponent, RouterLink, RentalListComponent, NgIf],
	templateUrl: './rental-list.component.html',
	styleUrl: './rental-list.component.scss'
})
export class PageRentalListComponent  implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	isDataLoaded = false
	hasError: boolean = false
	rentals!: Rental[]

	private rentalSubscription!: Subscription

	constructor(private rentalsService: RentalsService){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		this.rentalSubscription = this.rentalsService.getRentalList().subscribe({
			next: (data) => { 
				this.rentals = data
				this.isDataLoaded =true
			},
			error: (err) => {}
		})
	}
	ngOnDestroy(): void{
		if(this.rentalSubscription)
			this.rentalSubscription.unsubscribe()
	}

}

