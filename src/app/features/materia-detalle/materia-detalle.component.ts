import { Component, inject, OnInit } from '@angular/core';
import { Materia, MateriaAsignada } from '../../shared/models/materia.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiante } from '../../shared/models/estudiante.interface';
import { Profesor } from '../../shared/models/profesor.interface';
import { profesorService } from '../../core/services/profesor.service';
import { EstudianteService } from '../../core/services/estudiante.service';

@Component({
  selector: 'app-materia-detalle',
  imports: [],
  templateUrl: './materia-detalle.component.html',
  styleUrl: './materia-detalle.component.css'
})
export class MateriaDetalleComponent implements OnInit {
  
  private dialogRef = inject(MatDialogRef<MateriaDetalleComponent>);
  public data = inject<Materia>(MAT_DIALOG_DATA);
  private profesorService = inject(profesorService);
  private estudianteService = inject(EstudianteService);
  public materia: MateriaAsignada = this.data;
  EstudianteList: Estudiante[] = [];
  profesoresList: Profesor[] = [];
  estudianteInfo: Estudiante = {} as Estudiante;

  ngOnInit(): void {
    this.estudianteInfo = JSON.parse(sessionStorage.getItem('estudiante') || '{}');
    this.getEstudiantes();
    this.getProfesores();
    
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  getEstudiantes() {
    this.estudianteService.obtenerEstudiantes().subscribe({
      next: (response) => {
        this.EstudianteList = response;
        this.EstudianteList = this.listarEstudiantesPorMateria(this.materia.id!);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      },
    });
  }

  getProfesores() {
    this.profesorService.obtenerProfesores().subscribe({
      next: (response) => {
        this.profesoresList = response;
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      },
    });
  }

  listarEstudiantesPorMateria(materiaId: number): Estudiante[] {
    return this.EstudianteList.filter(estudiante =>
      estudiante.materiaMatriculadas!.some(materia => materia.id === materiaId) && estudiante.id !== this.estudianteInfo.id
    );
  }


  
}
