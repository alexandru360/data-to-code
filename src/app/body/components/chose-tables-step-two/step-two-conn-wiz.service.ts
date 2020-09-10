import {Injectable} from '@angular/core';
import {AppConfigService} from '../../../app.config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {COMMON_HEADER} from '../class-and-types-and-tools/constants';
import StepTwoResponse from '../class-and-types-and-tools/step-two-response';

@Injectable({
  providedIn: 'root'
})
export class StepTwoConnWizService {

  private stepTwoUrl: string;

  constructor(private httpClient: HttpClient,
              private cfg: AppConfigService) {
    this.stepTwoUrl = this.cfg.getConfiguration().urls.stepTwoUrlToBeRenamed;
  }

  callStepTwo(body: any): Observable<StepTwoResponse> {
    return this.httpClient.post<StepTwoResponse>(
      this.stepTwoUrl,
      body,
      {headers: COMMON_HEADER});
  }
}
