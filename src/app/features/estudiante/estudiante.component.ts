import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Estudiante } from '../../shared/models/estudiante.interface';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { EstudianteDetalleComponent } from '../estudiante-detalle/estudiante-detalle.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EstudianteService } from '../../core/services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  imports: [MenuComponent, RouterLink],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
  private  router = inject(Router);
  readonly dialog = inject(MatDialog);
  private estudianteService = inject(EstudianteService);

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
    this.getEstudiantes();
  }

  getEstudiantes() {
    this.EstudianteList = this.estudianteService.getEstudiantes();
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
      this.router.navigate([`/${urlToNavigate}`]);
    }

    mostrarDetalle(estudiante: Estudiante) {
      console.log('Detalles del estudiante:', estudiante);
      const dialogRef = this.dialog.open(EstudianteDetalleComponent, {
        height: '400px',
        width: '600px',
        data: {...estudiante},
      });

      dialogRef.disableClose = true;
    }
}
