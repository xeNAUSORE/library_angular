import { Component } from '@angular/core';
//Material
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-error-card',
	standalone: true,
	imports: [MatCardModule],
	templateUrl: './error-card.component.html',
	styleUrl: './error-card.component.scss'
})

export class ErrorCardComponent {
}
