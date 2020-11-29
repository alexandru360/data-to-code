import {Injectable} from '@angular/core';
import {AppConfigService} from '../../app.config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import StepOneResponse from '../class-and-types-and-tools/step-one-response';
import {COMMON_HEADER,realApiRootUrl} from '../class-and-types-and-tools/constants';

@Injectable({
  providedIn: 'root'
})
export class StepOneConnWizService {

  stepOneUrl: string;
  constructor(private httpClient: HttpClient,
              private cfg: AppConfigService) {
    this.stepOneUrl = realApiRootUrl(this.cfg.getConfiguration().urls.apiRootUrl) + '/' + this.cfg.getConfiguration().urls.stepOneFindTables;
  }

  callStepOne(body: any): Observable<StepOneResponse> {
    return this.httpClient.post<StepOneResponse>(
      this.stepOneUrl,
      body,
      {headers: COMMON_HEADER});
  }
}
