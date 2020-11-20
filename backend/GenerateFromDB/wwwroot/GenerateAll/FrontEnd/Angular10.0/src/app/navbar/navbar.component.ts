@{
  var angular="@angular";
  var Component="@Component";
}
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {  tap,map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../interceptors/loader.service';
import { ErrorService } from '../interceptors/error.service';


@(Component)({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public isLoading = false;
  
  constructor(private breakpointObserver: BreakpointObserver, private err: ErrorService
    ,         private snackBar: MatSnackBar
    ,         private ls: LoaderService) {

      this.err.NextError().pipe(
        tap(it => {
          this.snackBar.open(it, 'ERROR', {
            duration: 5000,
            verticalPosition: 'top'
          });
        }),
        shareReplay()
      ).subscribe();
      this.ls.loading$().subscribe(it => this.isLoading = it);
  

    }

}
