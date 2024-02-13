import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'
import { NgFor, NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//MAterial
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { ModalConfirmDeleteComponent } from '../../../../shared/components/modal-confirm-delete/modal-confirm-delete.component';
//Model
import { Author } from '../../../../shared/models/author';
//Services
import { AuthorsService } from '../../../../core/services/author/authors.service';
//Pipes
import { SearchPipe } from '../../../../shared/pipes/search.pipe';


@Component({
	selector: 'app-author-list',
	standalone: true,
	imports: [TitlePageComponent, SearchComponent, SearchPipe, ErrorCardComponent, MatCardModule, MatListModule, RouterLink, NgFor,NgIf, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './author-list.component.html',
	styleUrl: './author-list.component.scss'
})
export class AuthorListComponent implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	searchText: string = ''
	authors: Author[] = [
		{
			id:1,
			firstname:'Stephen',
			lastname: 'King',
			mail: 'stephenking@gmail.com',
			phone: '',
			books: [
				{ 
					id:1, 
					title:'Star wars', 
					description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum, erat non gravida faucibus, diam nisl aliquam quam, eu lacinia elit purus nec eros. Proin eget vulputate lectus.',
					author: null,
					rentals: null,
					domain:null
				}
			]
		},
		
	]
	private authorSubscription!: Subscription

	constructor(private authorsService: AuthorsService, private dialog: MatDialog){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//this.authorSubscription = this.authorsService.getAutorList().subscribe(v => this.autors = v)
	}
	ngOnDestroy(): void{
		if(this.authorSubscription)
			this.authorSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode delete de domain 
	deleteAuthor(id: number){
		this.authorSubscription = this.authorsService.deleteAuthor(id).subscribe({
			next: (data) => {  },
			error: (err) => { this.hasError = true }
		})
	}
	////////////////////////////////////////
	// Méthode search  domain  emit par le component search
	searchAuthor(search: string){
		this.searchText = search
	}

	////////////////////////////////////////
	//Open confirm delete
	openDialog(author: Author) {
		const dialogRef = this.dialog.open(ModalConfirmDeleteComponent,{
			data:{
				title: 'un auteur',
				message: `l'auteur ${author.firstname} ${author.lastname}`,
			}
		});

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
		  	if (confirmed) {
				this.deleteAuthor(author.id)
				dialogRef.close();
		  	}
		});
	}
}
