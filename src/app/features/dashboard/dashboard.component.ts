import {
  AfterViewInit,
  Component,
  effect,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { Estudiante } from '../../shared/models/estudiante.interface';
import {
  Materia,
  MateriaAsignada,
  MateriaRequest,
} from '../../shared/models/materia.interface';
import { Profesor } from '../../shared/models/profesor.interface';
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
import { EstudianteService } from '../../core/services/estudiante.service';
import { MateriaService } from '../../core/services/materia.service';
import { profesorService } from '../../core/services/profesor.service';
import { SignInService } from '../../core/services/signin.service';
import { After } from 'v8';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [
    EstudianteService,
    MateriaService,
    profesorService,
    SignInService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  private materiaService = inject(MateriaService);
  private profesorService = inject(profesorService);
  private signedInService = inject(SignInService);

  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  estudianteList: Estudiante[] = [];
  materias: Materia[] = [];
  materiasMatriculadasList: MateriaAsignada[] = [];
  paginatedData: MateriaAsignada[] = this.materiasMatriculadasList;
  profesoresList: Profesor[] = [];
  matriculoMaterias: boolean = false;
  profesorSeleccionado: string = '';
  materiaModel: Materia = {} as Materia;
  materiaForm!: FormGroup;
  creditosMatriculados: number = 0;
  mostrarAgregarMateria: boolean = false;
  estudianteInfo: Estudiante = {} as Estudiante;
  displayedColumns: string[] = [
    'Código',
    'Nombre Materia',
    'Creditos',
    'Docente',
    'Acciones',
  ];

  ngOnInit(): void {
    this.crearFormulario();
    this.getProfesores();
    this.getMaterias();
    this.cargarMateriasPorEstudiante();
  }
  
  cargarMateriasPorEstudiante() {
    setTimeout(() => {
      this.estudianteInfo = JSON.parse(
        sessionStorage.getItem('estudiante') || '{}'
      );
      this.obtenerMateriasRegistradas(this.estudianteInfo.id!);
    }, 500);
  }

  crearFormulario() {
    this.materiaForm = new FormGroup({
      materia: new FormControl('', [Validators.required]),
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
    this.materiaService.obtenerTodasMaterias().subscribe({
      next: (response) => {
        this.materias = response;
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      },
    });
  }

  obtenerMateriasRegistradas(usuarioId: number) {
    this.materiaService.obtenerMateriasPorEstudiante(usuarioId).subscribe({
      next: (response) => {
        this.materiasMatriculadasList = response;
        this.totalPages = Math.ceil(
          this.materiasMatriculadasList.length / this.pageSize
        );
        this.currentPage = 1;
        this.updatePaginatedData();
        this.generatePages();
        // sumar creditos
        this.creditosMatriculados = this.sumarCreditosMateria();
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      },
    });
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
          (item) => item.profesor?.id === materia.profesorId
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
          this.registrarMateria(materiaId);
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

  registrarMateria(materiaId: number) {
    let data: MateriaRequest = {
      idEstudiante: this.estudianteInfo.id!,
      idMateria: materiaId,
    };
    this.materiaService.matricularMateriasPorEstudiante(data).subscribe({
      next: (response) => {
        if (response) {
          this.obtenerMateriasRegistradas(this.estudianteInfo.id!);
          Swal.fire({
            title: 'Success!',
            text: 'Se ha agregardo la materia exitosamente',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          // sumar creditos
          this.creditosMatriculados = this.sumarCreditosMateria();
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      },
    });
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
        this.eliminarMateriaPorEstudiante(materiaId);
      } else if (result.isDenied) {
        Swal.fire('La materia no se eliminó', '', 'info');
      }
    });
  }

  eliminarMateriaPorEstudiante(materiaId: number) {
    let data: MateriaRequest = {
      idEstudiante: this.estudianteInfo.id!,
      idMateria: materiaId,
    };
    this.materiaService.eliminarMateriasPorEstudiante(data).subscribe({
      next: (response) => {
        if (response) {
          this.obtenerMateriasRegistradas(this.estudianteInfo.id!);
          // sumar creditos
          this.creditosMatriculados = this.sumarCreditosMateria();
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      },
    });
  }

  getProfesorById(id: number): string {
    let profesor = this.profesoresList.find(
      (profesor) => profesor.id === Number(id)
    );
    return profesor?.nombre + ' ' + profesor?.apellido;
  }

  mostrarDetalle(item: Materia) {
    const dialogRef = this.dialog.open(MateriaDetalleComponent, {
      height: '400px',
      width: '600px',
      data: { ...item },
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
