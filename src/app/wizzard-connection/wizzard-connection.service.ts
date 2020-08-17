import {Injectable} from '@angular/core';
import {ConfigService} from '../services/config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizzardConnectionService {

  mariaDbUrl: string;
  private HEADER = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient,
              private cfg: ConfigService) {
    this.mariaDbUrl = this.cfg.getConfiguration().urls.findTables;
  }

  callEndpointMariaDb(body: any): Observable<any> {
    return this.httpClient.post<any>(
      this.mariaDbUrl,
      body,
      {headers: this.HEADER});
  }
}
