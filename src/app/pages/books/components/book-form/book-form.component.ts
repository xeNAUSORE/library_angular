import { Component, OnDestroy, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//Material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider'
import {MatButtonModule} from '@angular/material/button'
import {MatSelectModule} from '@angular/material/select';
//Model
import { Author } from '../../../../shared/models/author';
import { Domain } from '../../../../shared/models/domain';
//Service
import { AuthorsService } from '../../../../core/services/author/authors.service';
import { DomainsService } from '../../../../core/services/domain/domains.service';

@Component({
	selector: 'app-book-form',
	standalone: true,
	imports: [NgIf,NgFor, FormsModule, MatButtonModule, MatDivider, MatCardModule, MatFormFieldModule,MatInputModule, ReactiveFormsModule, MatSelectModule],
	templateUrl: './book-form.component.html',
	styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	@Input() book: any
	@Output() newBookEvent =  new EventEmitter()

	bookForm!: FormGroup
	private authorSubscription!: Subscription
	private domainSubscription!: Subscription
	authors: Author[] = [
		{ id:1, firstname:'stephen', lastname:'king', mail:'', phone:'', books:null },
		{ id:2, firstname:'mc', lastname:'skyze', mail:'', phone:'', books:null }
	]
	domains: Domain[] = [
		{id: 1, name:'Science fiction', description:'', books:null },
		{id: 2, name:'Polar', description:'', books:null}
	]

	constructor(private authorsService: AuthorsService, private domainsService: DomainsService){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//set validator du form
		this.bookForm = new FormGroup({
			title: new FormControl('', [
			  	Validators.required,
			  	Validators.minLength(2),
			]),
			domain: new FormControl('', [
				Validators.required,
		  	]),
			author: new FormControl('', [
				Validators.required,
			]),
			description: new FormControl('')
		});

		//set un domaine est passer en param du component (edit)
		if(this.book)
			this.bookForm.setValue({ 
				title: this.book.title, 
				description: this.book.description, 
				domain: this.book.domain.id,
				author: this.book.author.id,
			})

		//load list author & domain
		// this.authorSubscription = this.authorsService.getAuthorList().subscribe({
		// 	next: (data) => { this.authors = data },
		// 	error: (err) => { }
		// })
		// this.domainSubscription = this.domainsService.getDomainList().subscribe({
		// 	next: (data) => { this.domains = data },
		// 	error: (err) => { }
		// })
	}

	ngOnDestroy(): void {
		if(this.authorSubscription)
			this.authorSubscription.unsubscribe()
		if(this.domainSubscription)
			this.domainSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Getter pour récupérer les formControl (input) du formGroup
	// Obligatoire pour utiliser la propriété du formGroup dans la vue
	get title(){
		return this.bookForm.get('title')
	}
	get description(){
		return this.bookForm.get('description')
	}
	get domain(){
		return this.bookForm.get('domain')
	}
	get author(){
		return this.bookForm.get('author')
	}

	///////////////////////////////////////
	// Méthode submit du formulaire
	onSubmit(){
		let b = {  }
		if(this.book) b = { id:this.book.id }
		b = { 
			...b, 
			title: this.bookForm.get('title'), 
			description: this.bookForm.get('description'),
			doamin: this.bookForm.get('domain'),
			author: this.bookForm.get('author')
		}

		//Emit l'objet au component parent
		this.newBookEvent.emit(b)
	}
}