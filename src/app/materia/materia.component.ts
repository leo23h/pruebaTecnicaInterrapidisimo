import { Component, inject, OnInit } from '@angular/core';
import { Materia } from '../shared/models/materia.interface';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materia',
  imports: [MenuComponent],
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.css'
})
export class MateriaComponent implements OnInit {
  private  router = inject(Router);

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
    this.materias = [
      { id: 1, nombre: 'Matemáticas Discretas', codigo: 'MAT101', creditos: 3 },
      { id: 2, nombre: 'Física Mecánica', codigo: 'FIS101', creditos: 3 },
      { id: 3, nombre: 'Algoritmos I', codigo: 'QUI101', creditos: 3 },
      { id: 4, nombre: 'Programación I', codigo: 'PROG01', creditos: 3 },
      { id: 5, nombre: 'Algoritmos I', codigo: 'ALG001', creditos: 3 },
      { id: 6, nombre: 'Estructura de Datos', codigo: 'EST001', creditos: 3 },
      { id: 7, nombre: 'Base de Datos', codigo: 'BASED001', creditos: 3 },
      { id: 8, nombre: 'Teoria de Automatas', codigo: 'TEA001', creditos: 3 },
      { id: 9, nombre: 'Ingenieria de software I', codigo: 'ING101', creditos: 3 },
      { id: 10, nombre: 'Automatización', codigo: 'AUT101', creditos: 3 },
      { id: 10, nombre: 'Automatización2', codigo: 'AUT101', creditos: 3 },
      { id: 10, nombre: 'Automatización3', codigo: 'AUT101', creditos: 3 }
    ];

    this.totalPages = Math.ceil(this.materias.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedData();
    this.generatePages();
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
