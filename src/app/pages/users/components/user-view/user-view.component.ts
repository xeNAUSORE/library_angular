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
//Component
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { RentalListComponent } from '../../../../shared/components/rental-list/rental-list.component';
//Model
import { User } from '../../../../shared/models/user';
import { Rental } from '../../../../shared/models/rental';
//Services
import { UsersService } from '../../../../core/services/users/users.service';
import { LoginComponent } from '../../../authentication/components/login/login.component';

@Component({
	selector: 'app-user-view',
	standalone: true,
	imports: [TitlePageComponent, NgIf, RentalListComponent, MatCardModule, MatListModule, RouterLink, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './user-view.component.html',
	styleUrl: './user-view.component.scss'
})

export class UserViewComponent implements OnDestroy, OnInit {
	////////////////////////////////////////
	// Properties
	isDataLoaded: boolean = false
	user!: User 
	userRentals!: Rental[]
	
	private userSubscription!: Subscription

	constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/users')
		else {
			const id = parseInt(paramId)
			this.userSubscription = this.usersService.getUser(id).subscribe({
				next: (data) => { 
					this.user = data 
					this.userRentals = data.rentals ?? []
					this.isDataLoaded = true
				},
				error: (err) => { this.router.navigateByUrl('/users') }
			})
		}
	}
	ngOnDestroy(): void{
		if(this.userSubscription)
			this.userSubscription.unsubscribe()
	}
}
