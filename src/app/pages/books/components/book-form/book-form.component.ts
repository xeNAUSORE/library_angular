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
	isDataLoaded: boolean = false
	@Input() book: any
	@Output() newBookEvent =  new EventEmitter()

	bookForm!: FormGroup
	private authorSubscription!: Subscription
	private domainSubscription!: Subscription
	authors!: Author[]
	domains!: Domain[]

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
			nbpages: new FormControl('', [
				Validators.required,
			]),
			description: new FormControl(''),
		});

		//set un domaine est passer en param du component (edit)
		if(this.book)
			this.bookForm.setValue({ 
				title: this.book.title, 
				description: this.book.description, 
				domain: this.book.domainId,
				author: this.book.authorId,
				nbpages: this.book.nbpages,
			})

		//load list author & domain
		this.authorSubscription = this.authorsService.getAuthorList().subscribe({
			next: (data) => { this.authors = data },
			error: (err) => { }
		})
		this.domainSubscription = this.domainsService.getDomainList().subscribe({
			next: (data) => { 
				this.domains = data 
				this.isDataLoaded = true
			},
			error: (err) => { }
		})
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
	get nbpages(){
		return this.bookForm.get('nbpages')
	}

	///////////////////////////////////////
	// Méthode submit du formulaire
	onSubmit(){
		let b = {  }
		if(this.book) b = { id:this.book.id }
		b = { 
			...b, 
			title: this.bookForm.get('title')?.value, 
			description: this.bookForm.get('description')?.value,
			domainId: this.bookForm.get('domain')?.value,
			authorId: this.bookForm.get('author')?.value,
			nbpages: this.bookForm.get('nbpages')?.value
		}

		//Emit l'objet au component parent
		this.newBookEvent.emit(b)
	}
}