import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
   private  router = inject(Router);

  ngOnInit(): void {
  }

  navigateTo = (urlToNavigate: string, id?: number) => {
    this.router.navigateByUrl(`${urlToNavigate}`);
  }

}
