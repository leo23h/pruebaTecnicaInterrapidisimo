import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Estudiante } from '../shared/models/estudiante.interface';
import { MenuComponent } from '../shared/components/menu/menu.component';

@Component({
  selector: 'app-estudiante',
  imports: [MenuComponent],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
  private  router = inject(Router);
  readonly dialog = inject(MatDialog);

  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  EstudianteList: Estudiante[] = [];
  paginatedData = this.EstudianteList;
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Teléfono', 'Email', 'Código Asignaturas', 'Acciones'];
  
  constructor() {
    // Simulación de datos de materias
   
  }
  ngOnInit(): void {
    this.getMaterias();
  }

  getMaterias() {
    this.EstudianteList = [
      { id: 1, nombre: 'Leonardo', apellido: 'Herrera', email: 'leonardo@univerdidad.com', telefono: '1234567890', materias: [
        // { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
        // { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
        // { id: 3, nombre: 'Algoritmos I', codigo: 'QUI101', creditos: 3 }
        ]
      },
      { id: 2, nombre: 'Joseph', apellido: 'Ariza', email: 'Joseph@univerdidad.com', telefono: '987456321', materias: [
        { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
        { id: 7, nombre: 'Base de Datos', codigo: 'BASED001', creditos: 3 },
        { id: 10, nombre: 'Automatización', codigo: 'AUT101', creditos: 3 }]
      },
      
    ];

    this.totalPages = Math.ceil(this.EstudianteList.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedData();
    this.generatePages();
  }

    // Pagination
    updatePaginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.EstudianteList.slice(start, end);
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
      this.router.navigateByUrl(`${urlToNavigate}`);
    }

    // mostrarDetalle(profesor: Profesor) {
    //   console.log('Detalles del profesor:', profesor);
    //   const dialogRef = this.dialog.open(ProfesorDetalleComponent, {
    //     height: '400px',
    //     width: '600px',
    //     data: {...profesor},
    //   });

    //   dialogRef.disableClose = true;
    // }
}
