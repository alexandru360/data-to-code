import {Injectable} from '@angular/core';
import {AppConfigService} from '../../app.config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {COMMON_HEADER} from '../class-and-types-and-tools/constants';
import StepTwoResponse from '../class-and-types-and-tools/step-two-response';
import {GenerateTypes} from '../../app.config.model';

@Injectable({
  providedIn: 'root'
})
export class StepTwoConnWizService {

  private stepTwoUrl: string;
  public generateTypesList: GenerateTypes;

  constructor(private httpClient: HttpClient,
              private cfg: AppConfigService) {
    this.stepTwoUrl = this.cfg.getConfiguration().urls.stepTwoUrlToBeRenamed;
    this.generateTypesList = this.cfg.getConfiguration().generateTypes;
  }

  callStepTwo(body: any): Observable<StepTwoResponse> {
    return this.httpClient.post<StepTwoResponse>(
      this.stepTwoUrl,
      body,
      {headers: COMMON_HEADER});
  }
}
