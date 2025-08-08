import { Component, inject } from '@angular/core';
import { Estudiante } from '../shared/models/estudiante.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-estudiante-detalle',
  imports: [],
  templateUrl: './estudiante-detalle.component.html',
  styleUrl: './estudiante-detalle.component.css'
})
export class EstudianteDetalleComponent {
  private dialogRef = inject(MatDialogRef<EstudianteDetalleComponent>);
  public data = inject<Estudiante>(MAT_DIALOG_DATA);
  public estudiante: Estudiante = this.data;

  cerrarModal() {
    this.dialogRef.close();
  }
}
