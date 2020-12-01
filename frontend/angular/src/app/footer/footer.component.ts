import {Component, OnInit} from '@angular/core';
import {SiteDetailsService} from '../site-details.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public version = '';

  constructor(public  st: SiteDetailsService) {
  }

  ngOnInit(): void {
    this.st.versionApp().subscribe({
      next: (result: string) => {
        this.version = result;
      },
      error: (err: any) => {
        console.log(err);
        // window.alert('no backend available');
      },
      complete: () => {
        // console.log('complete');
      },
    });
  }

}
