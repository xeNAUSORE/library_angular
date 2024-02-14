import { Component, OnDestroy, OnInit  } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//MAterial
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
//Component
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { BookListComponent } from '../../../../shared/components/book-list/book-list.component'
//Model
import { Author } from '../../../../shared/models/author';
import { Book } from '../../../../shared/models/book';
//Services
import { AuthorsService } from '../../../../core/services/author/authors.service';

@Component({
	selector: 'app-author-view',
	standalone: true,
	imports: [TitlePageComponent, NgIf, BookListComponent, MatCardModule, MatListModule, RouterLink, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './author-view.component.html',
	styleUrl: './author-view.component.scss'
})

export class AuthorViewComponent implements OnDestroy, OnInit {
	////////////////////////////////////////
	// Properties
	isDataLoaded: boolean = false
	author!: Author 
	authorBooks: Book[] = []
	
	private authorSubscription!: Subscription

	constructor(private authorsService: AuthorsService, private router: Router, private activatedRoute: ActivatedRoute){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/authors')
		else {
			const id = parseInt(paramId)
			this.authorSubscription = this.authorsService.getAuthor(id).subscribe({
				next: (data) => {  
					this.author = data 
					this.authorBooks = data.books ?? []
					this.isDataLoaded = true
				},
				error: (err) => { this.router.navigateByUrl('/domains') }
			})
		}
	}
	ngOnDestroy(): void{
		if(this.authorSubscription)
			this.authorSubscription.unsubscribe()
	}
}
