import { Component, OnDestroy, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

//Material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider'
import {MatButtonModule} from '@angular/material/button'

@Component({
	selector: 'app-author-form',
	standalone: true,
	imports: [NgIf,NgFor, FormsModule, MatButtonModule, MatDivider, MatCardModule, MatFormFieldModule,MatInputModule, ReactiveFormsModule],
	templateUrl: './author-form.component.html',
	styleUrl: './author-form.component.scss'
})
export class AuthorFormComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties

	@Input() author: any
	@Output() newAuthorEvent =  new EventEmitter()

	authorForm!: FormGroup

	constructor(){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//set validator du form
		this.authorForm = new FormGroup({
			firstname: new FormControl('', [
			  	Validators.required,
			  	Validators.minLength(2),
			]),
			lastname: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
		  	]),
			mail: new FormControl('', [
				Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
			]),
			phone: new FormControl('', [
				Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
			])
		});

		//set un domaine est passer en param du component (edit)
		if(this.author)
			this.authorForm.setValue({ 
				firstname: this.author.firstname, 
				lastname: this.author.lastname,
				mail: this.author.mail,
				phone: this.author.phone
			})
	}

	ngOnDestroy(): void {

	}

	////////////////////////////////////////
	// Getter pour récupérer les formControl (input) du formGroup
	// Obligatoire pour utiliser la propriété du formGroup dans la vue
	get firstname(){
		return this.authorForm.get('firstname')
	}
	get lastname(){
		return this.authorForm.get('lastname')
	}
	get mail(){
		return this.authorForm.get('mail')
	}
	get phone(){
		return this.authorForm.get('phone')
	}

	///////////////////////////////////////
	// Méthode submit du formulaire
	onSubmit(){
		let a = {  }
		if(this.author) a = { id:this.author.id }
		a = { 
			...a, 
			firstname: this.authorForm.get('firstname'), 
			lastname: this.authorForm.get('lastname'),
			mail: this.authorForm.get('mail'),
			phone: this.authorForm.get('phone')
		}

		//Emit l'objet au component parent
		this.newAuthorEvent.emit(a)
	}
}
