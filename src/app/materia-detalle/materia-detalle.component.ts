import { Component, inject, OnInit } from '@angular/core';
import { Materia } from '../../shared/models/materia.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiante } from '../../shared/models/estudiante.interface';
import { Profesor } from '../../shared/models/profesor.interface';

@Component({
  selector: 'app-materia-detalle',
  imports: [],
  templateUrl: './materia-detalle.component.html',
  styleUrl: './materia-detalle.component.css'
})
export class MateriaDetalleComponent implements OnInit {
  
  private dialogRef = inject(MatDialogRef<MateriaDetalleComponent>);
  public data = inject<Materia>(MAT_DIALOG_DATA);
  public materia: Materia = this.data;
  EstudianteList: Estudiante[] = [];
  profesoresList: Profesor[] = [];

  ngOnInit(): void {
    this.getEstudiantes();
    this.getProfesores();
    this.EstudianteList = this.listarEstudiantesPorMateria(this.materia.id!);
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  getEstudiantes() {
    this.EstudianteList = [
      { id: 2, nombre: 'Joseph', apellido: 'Ariza', email: 'Joseph@univerdidad.com', telefono: '987456321', materias: [
        { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
        { id: 7, nombre: 'Base de Datos', codigo: 'BASED001', creditos: 3 },
        { id: 3, nombre: 'Algoritmos I', codigo: 'ALG101', creditos: 3 }]
      }
    ];
  }

  getProfesores() {
    this.profesoresList = [
      {
        id: 1,
        nombre: 'Darwin',
        apellido: 'Mercado',
        email: 'profesor1@univerdidad.com',
        telefono: '1234567890',
        materias: [
          {
            id: 8,
            nombre: 'Teoria de Automatas',
            codigo: 'TEA001',
            creditos: 3,
            profesorId: 1,
          },
          { id: 10, nombre: 'Automatización', codigo: 'AUT101', creditos: 3 },
        ],
      },
      {
        id: 2,
        nombre: 'Paola',
        apellido: 'Ariza',
        email: 'profesor2@univerdidad.com',
        telefono: '987456321',
        materias: [
          {
            id: 6,
            nombre: 'Estructura de Datos',
            codigo: 'EST001',
            creditos: 3,
          },
          { id: 7, nombre: 'Base de Datos', codigo: 'BASED001', creditos: 3 },
        ],
      },
      {
        id: 3,
        nombre: 'Alexis',
        apellido: 'De la Hoz',
        email: 'profesor3@univerdidad.com',
        telefono: '9632587441',
        materias: [
          { id: 3, nombre: 'Algoritmos I', codigo: 'QUI101', creditos: 3 },
          { id: 4, nombre: 'Programación I', codigo: 'PROG01', creditos: 3 },
        ],
      },
      {
        id: 4,
        nombre: 'Jorge',
        apellido: 'Piñeres',
        email: 'profesor4@univerdidad.com',
        telefono: '456789123',
        materias: [
          {
            id: 9,
            nombre: 'Ingenieria de software I',
            codigo: 'ING101',
            creditos: 3,
          },
          {
            id: 10,
            nombre: 'Ingenieria de software II',
            codigo: 'ING102',
            creditos: 3,
          },
        ],
      },
      {
        id: 5,
        nombre: 'Roberto',
        apellido: 'Morales',
        email: 'profesor5@univerdidad.com',
        telefono: '123789456',
        materias: [
          {
            id: 1,
            nombre: 'Matemáticas Discretas',
            codigo: 'MAT101',
            creditos: 3,
          },
          { id: 2, nombre: 'Física Mecánica', codigo: 'FIS101', creditos: 3 },
        ],
      },
    ];
  }

  listarEstudiantesPorMateria(materiaId: number): Estudiante[] {
    return this.EstudianteList.filter(estudiante =>
      estudiante.materias!.some(materia => materia.id === materiaId)
    );
  }

  getProfesorById(id: number): string {
    let profesor = this.profesoresList.find(
      (profesor) => profesor.id === Number(id)
    );
    return profesor?.nombre + ' ' + profesor?.apellido;
  }
  
}
