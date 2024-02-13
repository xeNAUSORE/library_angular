import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//Components
import { UserFormComponent } from '../user-form/user-form.component';
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';
//Services
import { UsersService } from '../../../../core/services/users/users.service';
//Model
import { User } from '../../../../shared/models/user';

@Component({
	selector: 'app-user-edit',
	standalone: true,
	imports: [UserFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './user-edit.component.html',
	styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	private userSubscription!: Subscription
	//pour test sans API
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
		},
		rentals: null 
	}
	
	constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/domains')
		else {
			// const id = parseInt(paramId)
			// this.userSubscription = this.usersService.getUser(id).subscribe({
			// 	next: (data) => { this.user = data  },
			// 	error: (err) => { this.router.navigateByUrl('/domains') }
			// })
		}
	}
	ngOnDestroy(): void{
		if(this.userSubscription)
			this.userSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode edition  emit
	// Emit par le component enfant (user-form) au submit
	editUser(user: any){
		this.userSubscription = this.usersService.editUser(user).subscribe({
			next: (data) => { this.router.navigateByUrl('/users') },
			error: (err) => { this.hasError = true }
		})
	}
}
