import {Injectable} from '@angular/core';
import {AppConfigService} from '../../../z-main/services/app-config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardConnectionService {

  mariaDbUrl: string;
  private HEADER = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient,
              private cfg: AppConfigService) {
    this.mariaDbUrl = this.cfg.getConfiguration().urls.findTables;
  }

  callEndpointMariaDb(body: any): Observable<any> {
    return this.httpClient.post<any>(
      this.mariaDbUrl,
      body,
      {headers: this.HEADER});
  }
}
