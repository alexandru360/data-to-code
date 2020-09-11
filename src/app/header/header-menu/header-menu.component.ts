import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goProduct() {
    this.router.navigate(['/demo']);
  }

  goContact() {
    this.router.navigate(['/contact']);
  }
}
