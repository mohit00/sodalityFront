import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
@Component({
    selector: 'app-success',
    template: `<h1 matDialogTitle class="mb-05">{{ data.title }}</h1>
      <div mat-dialog-content class="mb-1">{{ data.message }}</div>
      <div mat-dialog-actions>
      <button 
      type="button" 
      mat-raised-button
      color="primary" 
      (click)="dialogRef.close(true)">OK</button>
        </div>`,
  })
  export class AppSuccessComponent {
    constructor(
      public dialogRef: MatDialogRef<AppSuccessComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any
    ) {}
  }