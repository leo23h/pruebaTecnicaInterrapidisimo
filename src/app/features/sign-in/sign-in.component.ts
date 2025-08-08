import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, ReactiveFormsModule ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  // inject dependencies
  private  router = inject(Router);
  // variables
  hide = signal(true);
  loginForm!: FormGroup;
  registroForm!: FormGroup;
 
  constructor() { }

  ngOnInit(): void {
    this.crearFormularioIngreso();
    this.crearFormularioRegistro();
  }

  crearFormularioIngreso() {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required])
    });
  }

  crearFormularioRegistro() {
    this.registroForm = new FormGroup({
      identificacion: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
      repetirContrasena: new FormControl('', [Validators.required])
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ingresar() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      console.log('Formulario de ingreso válido:', this.loginForm.value);
      this.navigateTo('dashboard');
    }
  }

  registrarUsuario() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    } else {
      console.log('Formulario de registro válido:', this.registroForm.value);
    }
  }

  navigateTo(urlToNavigate: string, id?: number) {
    this.router.navigate([`/${urlToNavigate}`]);
  }
}
