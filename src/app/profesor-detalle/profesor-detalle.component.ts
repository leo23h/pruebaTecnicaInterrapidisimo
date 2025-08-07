import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profesor } from '../shared/models/profesor.interface';

@Component({
  selector: 'app-profesor-detalle',
  imports: [],
  templateUrl: './profesor-detalle.component.html',
  styleUrl: './profesor-detalle.component.css'
})
export class ProfesorDetalleComponent {
  private dialogRef = inject(MatDialogRef<ProfesorDetalleComponent>);
  public data = inject<Profesor>(MAT_DIALOG_DATA);
  public profesor: Profesor = this.data;

  cerrarModal() {
    this.dialogRef.close();
  }
}
