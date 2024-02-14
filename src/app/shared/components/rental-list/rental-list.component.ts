import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router'
import { NgFor, NgIf } from '@angular/common';
// PIPE
import { DatePipe } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//MAterial
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
//Model
import { Rental } from '../../models/rental';
//Shared
import { SearchComponent } from '../search/search.component';
import { ErrorCardComponent } from '../error-card/error-card.component';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { EmptyResultCardComponent } from '../empty-result-card/empty-result-card.component';
//Service
import { RentalsService } from '../../../core/services/rentals/rentals.service';
//Pipe
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
	selector: 'app-rental-list',
	standalone: true,
	imports: [SearchComponent, ErrorCardComponent,EmptyResultCardComponent, DatePipe, SearchPipe, MatCardModule, MatListModule, RouterLink, NgFor,NgIf, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './rental-list.component.html',
	styleUrl: './rental-list.component.scss'
})
export class RentalListComponent implements OnInit, OnDestroy {
	@Input() rentals: Rental[] = []

	hasError: boolean = false
	searchText: string = ''

	private rentalSubscription!: Subscription

	constructor(private rentalsService: RentalsService, private dialog: MatDialog){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
	}
	ngOnDestroy(): void{
		if(this.rentalSubscription)
			this.rentalSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode delete
	deleteRental(id: number){
		this.rentalSubscription = this.rentalsService.deleteRental(id).subscribe({
			next: (data) => { 
				this.rentals = this.rentals.filter(r => r.id != id)
			 },
			error: (err) => { this.hasError = true }
		})
	}

	////////////////////////////////////////
	// Méthode search   emit par le component search
	searchRental(search: string){
		this.searchText = search
	}

	returnRental(rental: any){
		
		const r = { id: rental.id, bookId: rental.bookId, lectorId:rental.lectorId, rentalId: rental.rentalId, rentailDate: rental.rentailDate, returnDate:null  }

		this.rentalSubscription = this.rentalsService.returnRental(r).subscribe({
			next: (data) => { 
				const index = this.rentals.findIndex(r => r.id === rental.id);
    
				if(index > -1) this.rentals[index] = data
			},
			error: (err) => {}
		})
	}

	////////////////////////////////////////
	//Open confirm delete
	openDeleteDialog(rental: any) {
		const dialogRef = this.dialog.open(ModalConfirmDeleteComponent,{
			data:{
				title: 'un emprunt',
				message: `l'emprunt ${rental.book.title} - ${rental.lector.firstname} ${rental.lector.lastname}`,
			}
		});

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
		  	if (confirmed) {
				this.deleteRental(rental.id)
		
				dialogRef.close();
		  	}
		});
	}

	////////////////////////////////////////
	//Open confirm 
	openConfirmDialog(rental: any) {
		const dialogRef = this.dialog.open(ModalConfirmComponent,{
			data:{
				title: `le retour d'un livre`,
				message: `le retour : ${rental.book.title} par ${rental.lector.firstname} ${rental.lector.lastname}`,
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
