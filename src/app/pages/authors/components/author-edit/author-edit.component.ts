import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { NgIf } from '@angular/common';
//RX
import { Subscription } from 'rxjs'
//Components
import { AuthorFormComponent } from '../author-form/author-form.component';
//Shared components
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { ErrorCardComponent } from '../../../../shared/components/error-card/error-card.component';
//Services
import { AuthorsService } from '../../../../core/services/author/authors.service';
import { Author } from '../../../../shared/models/author';

@Component({
	selector: 'app-author-edit',
	standalone: true,
	imports: [AuthorFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './author-edit.component.html',
	styleUrl: './author-edit.component.scss'
})

export class AuthorEditComponent implements OnInit, OnDestroy {
	// Properties
	hasError: boolean = false
	private authorSubscription!: Subscription
	//pour test sans API
	author: Author = { id:1, firstname:'stephen', lastname:'king', mail:'mail@gmail.com', phone:'', books:null}

	constructor(private authorsService: AuthorsService, private router: Router, private activatedRoute: ActivatedRoute){}

	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		//Get l'id en parametre de l'url
		const paramId = this.activatedRoute.snapshot.paramMap.get('id')
		if(paramId == null) this.router.navigateByUrl('/authors')
		else {
			// const id = parseInt(paramId)
			// this.authorSubscription = this.authorsService.getAuthor(id).subscribe({
			// 	next: (data) => { this.author = data },
			// 	error: (err) => { this.router.navigateByUrl('/authors') }
			// })
		}
	}

	ngOnDestroy(): void{
		if(this.authorSubscription)
			this.authorSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode édition d' auteur emit
	// Emit par le component enfant (auteur-form) au submit
	editAuthor(author: any){
		this.authorSubscription = this.authorsService.editAuthor(author).subscribe({
			next: (data) => { this.router.navigateByUrl('/authors') },
			error: (err) => { this.hasError = true }
		})
	}
}
