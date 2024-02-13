import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router'

//Material
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
	selector: 'app-title-page',
	standalone: true,
	imports: [MatDividerModule, MatButtonModule, MatIconModule, NgIf, RouterLink],
	templateUrl: './title-page.component.html',
	styleUrl: './title-page.component.scss'
})

export class TitlePageComponent {
	@Input() title!: string
	@Input() hasAddBtn: boolean = false
	@Input() linkBtn!: string
}
