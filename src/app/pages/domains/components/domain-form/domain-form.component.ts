import { Component, OnDestroy, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
import { NgIf } from '@angular/common';
//Material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider'
import {MatButtonModule} from '@angular/material/button'

@Component({
	selector: 'app-domain-form',
	standalone: true,
	imports: [NgIf, FormsModule, MatButtonModule, MatDivider, MatCardModule, MatFormFieldModule,MatInputModule, ReactiveFormsModule],
	templateUrl: './domain-form.component.html',
	styleUrl: './domain-form.component.scss'
})
export class DomainFormComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	@Input() domain: any
	@Output() newDomainEvent =  new EventEmitter()

	domainForm!: FormGroup

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//set validator du form
		this.domainForm = new FormGroup({
			name: new FormControl('', [
			  	Validators.required,
			  	Validators.minLength(2),
			]),
			description: new FormControl('')
		});

		//set un domaine est passer en param du component (edit)
		if(this.domain)
			this.domainForm.setValue({ name: this.domain.name, description: this.domain.description })
	}

	ngOnDestroy(): void {
		
	}

	////////////////////////////////////////
	// Getter pour récupérer les formControl (input) du formGroup
	// Obligatoire pour utiliser la propriété du formGroup dans la vue
	get name(){
		return this.domainForm.get('name')
	}
	get description(){
		return this.domainForm.get('description')
	}


	////////////////////////////////////////
	// Méthode submit du formulaire
	onSubmit(){
		let d = {  }
		if(this.domain) d = { id:this.domain.id }
		d = { ...d, name: this.domainForm.get('name')?.value, description: this.domainForm.get('description')?.value }

		//Emit l'objet au component parent
		this.newDomainEvent.emit(d)
	}
}
