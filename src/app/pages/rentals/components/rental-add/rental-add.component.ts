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

	constructor(private rentalsService: RentalsService, private router: Router,private activatedRoute: ActivatedRoute){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		
	}

	ngOnDestroy(): void{
		if(this.rentalSubscription)
			this.rentalSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode création de l'auteur emit
	// Emit par le component enfant (rental-form) au submit
	addRental(rental: any){
		this.rentalSubscription = this.rentalsService.createRental(rental).subscribe({
			next: (data) => { this.router.navigateByUrl('/rentals') },
			error: (err) => { console.log(err); this.hasError = true }
		})
	}
}
