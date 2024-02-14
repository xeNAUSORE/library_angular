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
import { User } from '../../../../shared/models/user';
import { Book } from '../../../../shared/models/book';
//Service
import { UsersService } from '../../../../core/services/users/users.service';
import { BooksService } from '../../../../core/services/book/books.service';

@Component({
	selector: 'app-rental-form',
	standalone: true,
	imports: [NgIf,NgFor, FormsModule, MatButtonModule, MatDivider, MatCardModule, MatFormFieldModule,MatInputModule, ReactiveFormsModule, MatSelectModule],

	templateUrl: './rental-form.component.html',
	styleUrl: './rental-form.component.scss'
})
export class RentalFormComponent implements OnInit, OnDestroy {
	////////////////////////////////////////
	// Properties
	isDataLoaded: boolean = false
	@Input() rental: any
	@Output() newRentalEvent =  new EventEmitter()

	rentalForm!: FormGroup
	private userSubscription!: Subscription
	private bookSubscription!: Subscription

	users!: User[]
	books!: Book[]

	constructor(private usersService: UsersService, private booksService: BooksService){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//set validator du form
		this.rentalForm = new FormGroup({
			user: new FormControl('', [
				Validators.required,
		  	]),
			book: new FormControl('', [
				Validators.required,
			]),
		});

		//set un domaine est passer en param du component (edit)
		if(this.rental)
			this.rentalForm.setValue({ 
				book: this.rental.book.id,
				user: this.rental.lector.id,
			})
			
		//load list
		this.userSubscription = this.usersService.getUserList().subscribe({
			next: (data) => { this.users = data },
			error: (err) => { }
		})
		this.bookSubscription = this.booksService.getAvailableBookList().subscribe({
			next: (data) => { 
				this.books = data 
				this.isDataLoaded = true
			},
			error: (err) => { }
		})
	}

	ngOnDestroy(): void {
		if(this.userSubscription)
			this.userSubscription.unsubscribe()
		if(this.bookSubscription)
			this.bookSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Getter pour récupérer les formControl (input) du formGroup
	// Obligatoire pour utiliser la propriété du formGroup dans la vue
	
	get user(){
		return this.rentalForm.get('user')
	}
	get book(){
		return this.rentalForm.get('book')
	}

	///////////////////////////////////////
	// Méthode submit du formulaire
	onSubmit(){
		let r = {  }
		if(this.rental) r = { id:this.rental.id }
		r = { 
			...r, 
			lectorId: this.rentalForm.get('user')?.value, 
			bookId: this.rentalForm.get('book')?.value,
		}

		//Emit l'objet au component parent
		this.newRentalEvent.emit(r)
	}
}