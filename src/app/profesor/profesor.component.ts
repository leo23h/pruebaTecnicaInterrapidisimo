import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Profesor } from '../shared/models/profesor.interface';
import { MenuComponent } from '../shared/components/menu/menu.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ProfesorDetalleComponent } from '../profesor-detalle/profesor-detalle.component';

@Component({
  selector: 'app-profesor',
  imports: [MenuComponent, RouterLink],
  standalone: true,
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css'
})
export class ProfesorComponent {
  private  router = inject(Router);
  readonly dialog = inject(MatDialog);

  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  profesoresList: Profesor[] = [];
  paginatedData = this.profesoresList;
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Teléfono', 'Email', 'Código Asignaturas', 'Acciones'];
  
  constructor() {
    // Simulación de datos de materias
   
  }
  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores() {
    this.profesoresList = [
      { id: 1, nombre: 'Darwin', apellido: 'Mercado', email: 'profesor1@univerdidad.com', telefono: '1234567890', materias: [
        { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
        { id: 10, nombre: 'Automatización', codigo: 'AUT101', creditos: 3 }]
      },
      { id: 1, nombre: 'Paola', apellido: 'Ariza', email: 'profesor2@univerdidad.com', telefono: '987456321', materias: [
        { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
        { id: 7, nombre: 'Base de Datos', codigo: 'BASED001', creditos: 3 }]
      },
      { id: 1, nombre: 'Alexis', apellido: 'De la Hoz', email: 'profesor3@univerdidad.com', telefono: '9632587441', materias: [
        { id: 3, nombre: 'Algoritmos I', codigo: 'QUI101', creditos: 3 },
        { id: 4, nombre: 'Programación I', codigo: 'PROG01', creditos: 3 }]
      },
      { id: 1, nombre: 'Jorge', apellido: 'Piñeres', email: 'profesor4@univerdidad.com', telefono: '456789123', materias: [
        { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
        { id: 10, nombre: 'Ingenieria de software 2', codigo: 'AUT101', creditos: 3 }]
      },
      { id: 1, nombre: 'Roberto', apellido: 'Morales', email: 'profesor5@univerdidad.com', telefono: '123789456', materias: [
        { id: 1, nombre: 'Matemáticas Discretas', codigo: 'MAT101', creditos: 3 },
      { id: 2, nombre: 'Física Mecánica', codigo: 'FIS101', creditos: 3 }]
      },
    ];

    this.totalPages = Math.ceil(this.profesoresList.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedData();
    this.generatePages();
  }

    // Pagination
    updatePaginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.profesoresList.slice(start, end);
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

    regresar(route: string) {
      this.navigateTo(route);
    }

    navigateTo (urlToNavigate: string, id?: number) {
      this.router.navigate([`/${urlToNavigate}`]);
    }

    mostrarDetalle(profesor: Profesor) {
      console.log('Detalles del profesor:', profesor);
      const dialogRef = this.dialog.open(ProfesorDetalleComponent, {
        height: '400px',
        width: '600px',
        data: {...profesor},
      });

      dialogRef.disableClose = true;
    }
}
