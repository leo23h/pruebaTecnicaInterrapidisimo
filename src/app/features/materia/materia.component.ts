import { Component, inject, OnInit } from '@angular/core';
import { Materia } from '../../shared/models/materia.interface';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { Router, RouterLink } from '@angular/router';
import { MateriaService } from '../../core/services/materia.service';

@Component({
  selector: 'app-materia',
  imports: [MenuComponent, RouterLink],
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.css'
})
export class MateriaComponent implements OnInit {
  private  router = inject(Router);
  private materiaService = inject(MateriaService);

  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  materias: Materia[] = [];
  paginatedData = this.materias;
  displayedColumns: string[] = ['Código', 'Nombre Materia', 'Creditos'];
  
  constructor() {
    // Simulación de datos de materias
   
  }
  ngOnInit(): void {
    this.getMaterias();
  }

  getMaterias() {
    this.materiaService.obtenerTodasMaterias().subscribe({
      next: (response) => {
        this.materias = response;
        this.totalPages = Math.ceil(this.materias.length / this.pageSize);
        this.currentPage = 1;
        this.updatePaginatedData();
        this.generatePages();
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      },
    });

  }
    // Pagination
    updatePaginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.materias.slice(start, end);
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

}
