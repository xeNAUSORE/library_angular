import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
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

@Component({
	selector: 'app-user-add',
	standalone: true,
	imports: [UserFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './user-add.component.html',
	styleUrl: './user-add.component.scss'
})
export class UserAddComponent implements OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	private userSubscription!: Subscription

	constructor(private usersService: UsersService, private router: Router){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnDestroy(): void{
		if(this.userSubscription)
			this.userSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode création  emit
	// Emit par le component enfant (user-form) au submit
	addUser(user: any){
		this.userSubscription = this.usersService.createUser(user).subscribe({
			next: (data) => { this.router.navigateByUrl('/users') },
			error: (err) => { this.hasError = true }
		})
	}
}
