import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
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

@Component({
	selector: 'app-author-add',
	standalone: true,
	imports: [AuthorFormComponent, TitlePageComponent, ErrorCardComponent, NgIf],
	templateUrl: './author-add.component.html',
	styleUrl: './author-add.component.scss'
})
export class AuthorAddComponent implements OnDestroy {
	////////////////////////////////////////
	// Properties
	hasError: boolean = false
	private authorSubscription!: Subscription

	constructor(private authorsService: AuthorsService, private router: Router){}

	////////////////////////////////////////
	// LifeCycle
	ngOnDestroy(): void{
		if(this.authorSubscription)
			this.authorSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode création de l'auteur emit
	// Emit par le component enfant (author-form) au submit
	addAuthor(author: any){
		this.authorSubscription = this.authorsService.createAuthor(author).subscribe({
			next: (data) => { this.router.navigateByUrl('/authors') },
			error: (err) => { this.hasError = true }
		})
	}
}
