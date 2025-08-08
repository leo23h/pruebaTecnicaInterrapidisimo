import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Estudiante } from '../shared/models/estudiante.interface';
import { Materia } from '../shared/models/materia.interface';
import { Profesor } from '../shared/models/profesor.interface';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MateriaDetalleComponent } from '../materia-detalle/materia-detalle.component';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  readonly dialog = inject(MatDialog);

  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  estudianteList: Estudiante[] = [];
  materias: Materia[] = [];
  materiasMatriculadasList: Materia[] = [];
  paginatedData: Materia[] = this.materiasMatriculadasList;
  profesoresList: Profesor[] = [];
  matriculoMaterias: boolean = false;
  profesorSeleccionado: string = '';
  materiaModel: Materia = {} as Materia;
  materiaForm!: FormGroup;
  creditosMatriculados: number = 0;
  mostrarAgregarMateria: boolean = false;
  displayedColumns: string[] = [
    'Código',
    'Nombre Materia',
    'Creditos',
    'Docente',
    'Acciones',
  ];

  ngOnInit(): void {
    this.crearFormulario();
    this.getEstudiante();
    this.getMaterias();
    this.getProfesores();
  }

  crearFormulario() {
    this.materiaForm = new FormGroup({
      materia: new FormControl('', [Validators.required]),
    });
  }

  getEstudiante() {
    this.estudianteList = [
      {
        id: 1,
        nombre: 'Leonardo',
        apellido: 'Herrera',
        email: 'leonardo@univerdidad.com',
        telefono: '1234567890',
        materias: [
          // { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
          // { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
          // { id: 3, nombre: 'Algoritmos I', codigo: 'QUI101', creditos: 3 }
        ],
      },
    ];
  }

  navigateTo(urlToNavigate: string, id?: number) {
    console.log('urlToNavigate');
    this.router.navigate([`/${urlToNavigate}`]);
  }

  // Pagination
  updatePaginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.materiasMatriculadasList.slice(start, end);
  }

  generatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  getMaterias() {
    this.materias = [
      {
        id: 1,
        nombre: 'Matemáticas Discretas',
        codigo: 'MAT101',
        creditos: 3,
        profesorId: 5,
        estudianteId: null,
      },
      {
        id: 2,
        nombre: 'Física Mecánica',
        codigo: 'FIS101',
        creditos: 3,
        profesorId: 5,
        estudianteId: null,
      },
      {
        id: 3,
        nombre: 'Ingenieria de software II',
        codigo: 'ING102',
        creditos: 3,
        profesorId: 4,
        estudianteId: null,
      },
      {
        id: 4,
        nombre: 'Programación I',
        codigo: 'PROG01',
        creditos: 3,
        profesorId: 3,
        estudianteId: null,
      },
      {
        id: 5,
        nombre: 'Algoritmos I',
        codigo: 'ALG001',
        creditos: 3,
        profesorId: 3,
        estudianteId: null,
      },
      {
        id: 6,
        nombre: 'Estructura de Datos',
        codigo: 'EST001',
        creditos: 3,
        profesorId: 2,
        estudianteId: null,
      },
      {
        id: 7,
        nombre: 'Base de Datos',
        codigo: 'BASED001',
        creditos: 3,
        profesorId: 2,
        estudianteId: null,
      },
      {
        id: 8,
        nombre: 'Teoria de Automatas',
        codigo: 'TEA001',
        creditos: 3,
        profesorId: 1,
        estudianteId: null,
      },
      {
        id: 9,
        nombre: 'Ingenieria de software I',
        codigo: 'ING101',
        creditos: 3,
        profesorId: 4,
        estudianteId: null,
      },
      {
        id: 10,
        nombre: 'Automatización',
        codigo: 'AUT101',
        creditos: 3,
        profesorId: 1,
        estudianteId: null,
      },
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

  matricularMaterias(materiaId: number) {
    const materia = this.materias.find((m) => m.id === Number(materiaId));
    if (materia) {
      if (this.materiasMatriculadasList.length > 2) {
        Swal.fire({
          title: '¡Error!',
          text: 'Solo puedes matricular hasta 3 materias',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      } else {
        const isAlreadyEnrolled = this.materiasMatriculadasList.some(
          (item) => item.profesorId === materia.profesorId
        );
        if (isAlreadyEnrolled) {
          // Verificar si la materia ya está matriculada
          Swal.fire({
            title: '¡Error!',
            text: 'No puedes tener al mismo profesor en dos o mas materias diferentes',
            icon: 'info',
            confirmButtonText: 'OK',
          });
          return;
        } else {
          // Matricular la materia
          materia.estudianteId = this.estudianteList[0].id;
          this.materiasMatriculadasList.push(materia);
          this.estudianteList[0].materias?.push(materia);
          Swal.fire({
            title: 'Success!',
            text: 'Se ha agregardo la materia exitosamente',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
      }
    }
    this.materiaForm.reset();
    this.profesorSeleccionado = '';
    // paginador
    this.totalPages = Math.ceil(
      this.materiasMatriculadasList.length / this.pageSize
    );
    this.currentPage = 1;
    this.updatePaginatedData();
    this.generatePages();
    // sumar creditos
    this.creditosMatriculados = this.sumarCreditosMateria();
  }

  eliminarMaterias(materiaId: number) {
    Swal.fire({
      title: '¿Estas seguro de eliminar la materia?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // remover la materia de la lista principal
        let indexMateriaMatriculada = this.materiasMatriculadasList.findIndex(
          (item) => item.id === Number(materiaId)
        );
         this.materiasMatriculadasList.splice(indexMateriaMatriculada, 1 );
        this.paginatedData = this.materiasMatriculadasList;
        this.estudianteList[0].materias?.splice(indexMateriaMatriculada, 1);
        // paginador
        this.totalPages = Math.ceil(
          this.materiasMatriculadasList.length / this.pageSize
        );
        this.currentPage = 1;
        this.updatePaginatedData();
        this.generatePages();
      } else if (result.isDenied) {
        Swal.fire('La materia no se eliminó', '', 'info');
      }
    });
  }

  getProfesorById(id: number): string {
    let profesor = this.profesoresList.find(
      (profesor) => profesor.id === Number(id)
    );
    return profesor?.nombre + ' ' + profesor?.apellido;
  }

  mostrarDetalle(item: Materia) {
    console.log('Detalles de Materia:', item);
    const dialogRef = this.dialog.open(MateriaDetalleComponent, {
      height: '400px',
      width: '600px',
      data: {...item},
    });

    dialogRef.disableClose = true;
  }

  mostrarTablaMaterias() {
    this.matriculoMaterias = true;
  }

  seleccionarMateria(idMateria: number) {
    const materia = this.materias.find((m) => m.id === Number(idMateria));
    this.profesorSeleccionado = this.getProfesorById(
      Number(materia?.profesorId)
    );
  }

  sumarCreditosMateria() {
    let totalCreditos = 0;
    this.materiasMatriculadasList.forEach((materia) => {
      totalCreditos += materia.creditos;
    });
    return totalCreditos;
  }

  mostrarComponenteAgregarMateria() {
    this.mostrarAgregarMateria = !this.mostrarAgregarMateria;
    if (this.mostrarAgregarMateria) {
      this.materiaForm.reset();
      this.profesorSeleccionado = '';
    }
  }

}
