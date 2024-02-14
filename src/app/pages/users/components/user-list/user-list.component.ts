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
import { User } from '../../../../shared/models/user';
//Services
import { UsersService } from '../../../../core/services/users/users.service';
//Pipes
import { SearchPipe } from '../../../../shared/pipes/search.pipe';



@Component({
	selector: 'app-user-list',
	standalone: true,
	imports: [TitlePageComponent, EmptyResultCardComponent, SearchComponent, SearchPipe, ErrorCardComponent, MatCardModule, MatListModule, RouterLink, NgFor,NgIf, MatButtonModule, MatIconModule, MatChipsModule],
	templateUrl: './user-list.component.html',
	styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy{
	////////////////////////////////////////
	// Properties
	isDataLoaded = false
	hasError: boolean = false
	searchText: string = ''
	users!: User[]
	private userSubscription!: Subscription

	constructor(private usersService: UsersService, private dialog: MatDialog){}
	
	////////////////////////////////////////
	// LifeCycle
	ngOnInit(): void {
		this.userSubscription = this.usersService.getUserList().subscribe({
			next: (data) => { 
				this.users = data
				this.isDataLoaded = true
			 },
			error: (err) => { this.hasError = true }
		})
	}
	ngOnDestroy(): void{
		if(this.userSubscription)
			this.userSubscription.unsubscribe()
	}

	////////////////////////////////////////
	// Méthode delete de domain 
	deleteUser(id: number){
		this.userSubscription = this.usersService.deleteUser(id).subscribe({
			next: (data) => { 
				this.users = this.users.filter(u => u.id != id)
			 },
			error: (err) => { this.hasError = true }
		})
	}
	////////////////////////////////////////
	// Méthode search  domain  emit par le component search
	searchUser(search: string){
		this.searchText = search
	}

	////////////////////////////////////////
	//Open confirm delete
	openDialog(user: User) {
		const dialogRef = this.dialog.open(ModalConfirmDeleteComponent,{
			data:{
				title: 'un lecteur',
				message: `le lecteur ${user.firstname} ${user.lastname}`,
			}
		});

		dialogRef.afterClosed().subscribe((confirmed: boolean) => {
		  	if (confirmed) {
				this.deleteUser(user.id)
				dialogRef.close();
		  	}
		});
	}
}
