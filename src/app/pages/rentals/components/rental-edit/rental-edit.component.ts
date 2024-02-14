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

	rental!: Rental

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
