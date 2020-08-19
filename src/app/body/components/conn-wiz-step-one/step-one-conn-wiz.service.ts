import {Injectable} from '@angular/core';
import {AppConfigService} from '../../../z-main/services/app-config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import EntitiesDetails from '../class-and-types/entities-details';
import StepOneResponse from '../class-and-types/step-one-response';

@Injectable({
  providedIn: 'root'
})
export class StepOneConnWizService {

  mariaDbUrl: string;
  private HEADER = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient,
              private cfg: AppConfigService) {
    this.mariaDbUrl = this.cfg.getConfiguration().urls.findTables;
  }

  callEndpointMariaDb(body: any): Observable<StepOneResponse> {
    return this.httpClient.post<StepOneResponse>(
      this.mariaDbUrl,
      body,
      {headers: this.HEADER});
  }
}
