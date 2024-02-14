import { Component, OnDestroy, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

//Material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider'
import {MatButtonModule} from '@angular/material/button'
import { User } from '../../../../shared/models/user';

@Component({
	selector: 'app-user-form',
	standalone: true,
	imports: [NgIf,NgFor, FormsModule, MatButtonModule, MatDivider, MatCardModule, MatFormFieldModule,MatInputModule, ReactiveFormsModule],
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties

	@Input() user: any
	@Output() newUserEvent =  new EventEmitter()

	userForm!: FormGroup

	constructor(){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//set validator du form
		this.userForm = new FormGroup({
			firstname: new FormControl('', [
			  	Validators.required,
			  	Validators.minLength(2),
			]),
			lastname: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
		  	]),
			mail: new FormControl('', [
				Validators.required,
				Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
			]),
			phone: new FormControl('', [
				Validators.required,
				Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
			]),
			number: new FormControl('', [
				Validators.required,
			]),
			street: new FormControl('', [
				Validators.required,
			]),
			apt: new FormControl(''),
			city: new FormControl('', [
				Validators.required,
			]),
			zip: new FormControl('', [
				Validators.required,
			]),
			country: new FormControl('', [
				Validators.required,
			])
		});

		//set un domaine est passer en param du component (edit)
		if(this.user)
			this.userForm.setValue({ 
				firstname: this.user.firstname, 
				lastname: this.user.lastname,
				mail: this.user.email,
				phone: this.user.phone,
				number: this.user.address.number,
				street: this.user.address.street,
				apt: this.user.address.apt,
				city: this.user.address.city,
				zip: this.user.address.zip,
				country: this.user.address.country,
			})
	}

	ngOnDestroy(): void {

	}

	////////////////////////////////////////
	// Getter pour récupérer les formControl (input) du formGroup
	// Obligatoire pour utiliser la propriété du formGroup dans la vue
	get firstname(){
		return this.userForm.get('firstname')
	}
	get lastname(){
		return this.userForm.get('lastname')
	}
	get mail(){
		return this.userForm.get('mail')
	}
	get phone(){
		return this.userForm.get('phone')
	}
	get number(){
		return this.userForm.get('number')
	}
	get street(){
		return this.userForm.get('street')
	}
	get city(){
		return this.userForm.get('city')
	}
	get zip(){
		return this.userForm.get('zip')
	}
	get apt(){
		return this.userForm.get('apt')
	}
	get country(){
		return this.userForm.get('country')
	}

	///////////////////////////////////////
	// Méthode submit du formulaire
	onSubmit(){
		let u = {  }
		let address = { }
		if(this.user) {
			u = { id:this.user.id }
			address =  { id: this.user.address.id }
		}
		u = { 
			...u, 
			firstname: this.userForm.get('firstname')?.value, 
			lastname: this.userForm.get('lastname')?.value,
			email: this.userForm.get('mail')?.value,
			phone: this.userForm.get('phone')?.value,
			address: {
				...address,
				number: this.userForm.get('number')?.value,
				street: this.userForm.get('street')?.value,
				apt: this.userForm.get('apt')?.value,
				city: this.userForm.get('city')?.value,
				zip: this.userForm.get('zip')?.value,
				country: this.userForm.get('country')?.value,
			}
		}		
		
		//Emit l'objet au component parent
		this.newUserEvent.emit(u)
	}
}
