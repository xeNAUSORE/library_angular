import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
//Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
	selector: 'app-empty-result-card',
	standalone: true,
	imports: [MatCardModule, RouterLink, MatButtonModule],
	templateUrl: './empty-result-card.component.html',
	styleUrl: './empty-result-card.component.scss'
})
export class EmptyResultCardComponent {
	@Input() link: string = ''

}
