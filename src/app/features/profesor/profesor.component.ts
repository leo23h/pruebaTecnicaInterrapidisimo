import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Profesor } from '../../shared/models/profesor.interface';
import { MenuComponent } from '../../shared/components/menu/menu.component';
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
import { profesorService } from '../../core/services/profesor.service';

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
  private profesoresService = inject(profesorService);

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
    
    this.profesoresService.obtenerProfesores().subscribe({
      next: (response) => {
        console.log("profesores", response);
        this.profesoresList = response;
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      },
    });


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
