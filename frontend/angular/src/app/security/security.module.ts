import {NgModule} from '@angular/core';
import {SecurityService} from './security.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [SecurityService],
  bootstrap: []
})
export class SecurityModule {
}
