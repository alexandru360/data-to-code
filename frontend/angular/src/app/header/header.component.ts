import { Component, HostListener, OnInit } from '@angular/core';
import { SiteDetailsService } from '../site-details.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = 'Data to Code#';
  isMenuOpen: boolean;
  isPhoneView: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log(event.target.innerWidth);
    // console.log(event.target.innerWidth >= 700);
    this.isPhoneView = event.target.innerWidth <= 700;
  }

  constructor(public  st: SiteDetailsService) {
    this.isMenuOpen = false;
    this.onResize({ target: { innerWidth: window.screen.width } });
  }
  ngOnInit(): void {
   
  }
}
