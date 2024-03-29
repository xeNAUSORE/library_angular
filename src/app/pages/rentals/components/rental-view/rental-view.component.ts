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
import {MatDialog} from '@angular/material/dialog';
//Component
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm/modal-confirm.component';
//Model
import { Rental } from '../../../../shared/models/rental';
//Services
import { RentalsService } from '../../../../core/services/rentals/rentals.service';
//Pipe
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-rental-view',
	standalone: true,
	imports: [TitlePageComponent,  NgIf, DatePipe, MatCardModule, MatListModule, RouterLink, MatButtonModule, MatIconModule, MatChipsModule],
	
	templateUrl: './rental-view.component.html',
	styleUrl: './rental-view.component.scss'
})
export class RentalViewComponent implements OnDestroy, OnInit {
	////////////////////////////////////////
	// Properties
	isDataLoaded: boolean = false
	rental!: any
	
	private rentalSubscription!: Subscription

	constructor(private dialog: MatDialog, private rentalsService: RentalsService, private router: Router, private activatedRoute: ActivatedRoute){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/users')
		else {
			const id = parseInt(paramId)
			this.rentalSubscription = this.rentalsService.getRental(id).subscribe({
				next: (data) => { 
					this.rental = data 
					console.log(data)
					this.isDataLoaded = true
				},
				error: (err) => { this.router.navigateByUrl('/rentals') }
			})
		}
	}
	ngOnDestroy(): void{
		if(this.rentalSubscription)
			this.rentalSubscription.unsubscribe()
	}

	returnRental(rental: any){
		
		const r = { id: rental.id, bookId: rental.bookId, lectorId:rental.lectorId, rentalId: rental.rentalId, rentailDate: rental.rentailDate, returnDate:null  }

		this.rentalSubscription = this.rentalsService.returnRental(r).subscribe({
			next: (data) => { 
				this.router.navigateByUrl('/rentals')
			},
			error: (err) => {}
		})
	}

	////////////////////////////////////////
	//Open confirm 
	openConfirmDialog(rental: Rental) {
		const dialogRef = this.dialog.open(ModalConfirmComponent,{
			data:{
				title: `le retour d'un livre`,
				message: `le retour : ${rental.book.title} par ${rental.user.firstname} ${rental.user.lastname}`,
			}
		});

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
		  	if (confirmed) {
				this.returnRental(rental)
				dialogRef.close();
		  	}
		});
	}
}
