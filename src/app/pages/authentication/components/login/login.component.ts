import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router'
import { NgIf } from '@angular/common'
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
//RX
import { Subscription } from 'rxjs'
//Material
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
//services
import { AuthService } from '../../../../core/services/authentication/auth.service';
//Component
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ NgIf,TitlePageComponent, ErrorCardComponent, RouterLink, ReactiveFormsModule, FormsModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false

	authForm!: FormGroup
	private authSubscription!: Subscription

	constructor(private authService: AuthService, private router: Router) {
	}

	////////////////////////////////////////
	// Life Cycle
	ngOnInit(): void {
		//set validator du form
		this.authForm = new FormGroup({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
		});

		if(this.authService.isAuthenticated()) this.router.navigateByUrl('') 
	}
	ngOnDestroy(): void {
		if(this.authSubscription)
			this.authSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Getter pour récupérer les formControl (input) du formGroup
	// Obligatoire pour utiliser la propriété du formGroup dans la vue
	get username(){
		return this.authForm.get('username')
	}
	get password(){
		return this.authForm.get('password')
	}

	////////////////////////////////////////
	// Méthode submit du formulaire
	onSubmit() {
		const user: any = { 
			password: this.authForm.get('password')?.value, 
			email:this.authForm.get('username')?.value, 
			phone:'', 
			firstname:'', 
			lastname:'',  
		}
		//pour test sans api
		// localStorage.setItem('authenticatedUser', user)
		// this.authService.setAuthenticatedRefresh(true)
		// this.router.navigateByUrl('')

		
		this.authSubscription = this.authService.login(user).subscribe({
			next: (data) => { 
				console.log(data)
				localStorage.setItem('authenticatedUser', JSON.stringify(data))
				this.authService.setAuthenticatedRefresh(true)
				this.router.navigateByUrl('')
			},
			error: (err) => { this.hasError = true }
		})
	}
}
