import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(private router: Router) { }

  goToAdminPanel(){
    this.router.navigateByUrl('/admin');
  }
}
