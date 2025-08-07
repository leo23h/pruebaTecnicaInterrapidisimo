import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-sign-in',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  hide = signal(true);
  constructor() { }
  ngOnInit(): void {
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
