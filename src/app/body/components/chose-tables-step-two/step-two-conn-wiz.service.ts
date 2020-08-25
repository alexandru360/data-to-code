import {Injectable} from '@angular/core';
import {AppConfigService} from '../../../z-main/services/app-config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import EntitiesDetails from '../class-and-types-and-tools/entities-details';
import StepOneResponse from '../class-and-types-and-tools/step-one-response';
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
