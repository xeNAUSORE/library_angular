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
import { EmptyResultCardComponent } from '../../../../shared/components/empty-result-card/empty-result-card.component';
//Model
import { Author } from '../../../../shared/models/author';
//Services
import { AuthorsService } from '../../../../core/services/author/authors.service';
//Pipes
import { SearchPipe } from '../../../../shared/pipes/search.pipe';



@Component({
	selector: 'app-author-list',
	standalone: true,
	imports: [TitlePageComponent, EmptyResultCardComponent, SearchComponent, SearchPipe, ErrorCardComponent, MatCardModule, MatListModule, RouterLink, NgFor,NgIf, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './author-list.component.html',
	styleUrl: './author-list.component.scss'
})
export class AuthorListComponent implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	isDataLoaded = false
	hasError: boolean = false
	searchText: string = ''
	authors!: Author[] 
	private authorSubscription!: Subscription

	constructor(private authorsService: AuthorsService, private dialog: MatDialog){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		this.authorSubscription = this.authorsService.getAuthorList().subscribe({
			next: (data) => { 
				this.authors = data
				this.isDataLoaded = true
			 },
			error: (err) => { this.hasError = true }
		})
	}
	ngOnDestroy(): void{
		if(this.authorSubscription)
			this.authorSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode delete de domain 
	deleteAuthor(id: number){
		this.authorSubscription = this.authorsService.deleteAuthor(id).subscribe({
			next: (data) => { 
				this.authors = this.authors.filter(a => a.id != id)
			 },
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
