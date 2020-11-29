import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from './app.config.service';
import { Observable } from 'rxjs';
import {  optionsText } from './product/class-and-types-and-tools/constants';
@Injectable({
  providedIn: 'root'
})
export class SiteDetailsService {

  constructor(private httpClient: HttpClient,
              private cfg: AppConfigService) { 


              }

  public versionApp(): Observable<string>{

    const url = this.cfg.getConfiguration().urls.apiRootUrl + '/' + this.cfg.getConfiguration().urls.versionUrl;
    return this.httpClient.get(url,optionsText);
  }
}
