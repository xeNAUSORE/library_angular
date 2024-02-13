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
	user: User = { 
		id:1, 
		firstname:'xen',
		lastname:'ausore',
		mail:'xenausore@gmail.com', phone:'0102030405', 
		address: {
			id: 1,
			number: 12,
			street: 'rue du château',
			apt: '',
			city: 'Nantes',
			country: 'France',
			zip: '44000'
		} ,
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
					author: { id:1, firstname:'Stephen', lastname:'King', email:'', phone:'', books:null, grade:'' },
					domain: { id:1, name:'Science Fiction', description:'', books:null} ,
					rentals: null
				} ,
				rentAt: new Date(),
				returnAt: null
			}
		]
	}
	userRentals: Rental[] = this.user.rentals ?? []
	
	private userSubscription!: Subscription

	constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/users')
		else {
			// const id = parseInt(paramId)
			// this.authorSubscription = this.usersService.getUser(id).subscribe({
			// 	next: (data) => { this.user = data },
			// 	error: (err) => { this.router.navigateByUrl('/users') }
			// })
		}
	}
	ngOnDestroy(): void{
		if(this.userSubscription)
			this.userSubscription.unsubscribe()
	}
}
