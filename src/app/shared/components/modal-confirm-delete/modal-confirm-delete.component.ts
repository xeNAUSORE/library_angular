import { Component, Inject } from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatDialogRef,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogClose,
  } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'

@Component({
	selector: 'app-modal-confirm-delete',
	standalone: true,
	imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule, MatDividerModule],
	templateUrl: './modal-confirm-delete.component.html',
	styleUrl: './modal-confirm-delete.component.scss'
})
export class ModalConfirmDeleteComponent {
	message: string = ''
	title: string = ''

	constructor(
	  @Inject(MAT_DIALOG_DATA) private data: any,
	  private dialogRef: MatDialogRef<ModalConfirmDeleteComponent>) {
		if(data){
			this.title = data.title || this.title
			this.message = data.message || this.message;
		}
	}
  
	onConfirmClick(): void {
	  	this.dialogRef.close(true);
	}
}
