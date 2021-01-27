import {Injectable} from '@angular/core';
import {AppConfigService} from '../../app.config.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {COMMON_HEADER, realApiRootUrl} from '../class-and-types-and-tools/constants';
import StepTwoResponse from '../class-and-types-and-tools/step-two-response';
import {GenerateTypes} from '../../app.config.model';
import {timeout, catchError} from 'rxjs/operators';
import { OutputTypes} from '../class-and-types-and-tools/OutputTypes';
@Injectable({
  providedIn: 'root'
})
export class StepTwoConnWizService {

  private stepTwoUrl: string;
  public generateTypesList: GenerateTypes;
  private templateUrl:string;
  constructor(private httpClient: HttpClient,
              private cfg: AppConfigService) {
                var cfgRoot = this.cfg.getConfiguration();
    this.stepTwoUrl = realApiRootUrl(cfgRoot.urls.apiRootUrl) + '/' + cfgRoot.urls.stepTwoUrlToBeRenamed;
    this.generateTypesList = cfgRoot.generateTypes;
    this.templateUrl=realApiRootUrl(cfgRoot.urls.apiRootUrl) + '/' + cfgRoot.urls.templates;
  }

  callStepTwo(body: any): Observable<StepTwoResponse> {
    return this.httpClient.post<StepTwoResponse>(
      this.stepTwoUrl,
      body,
      {headers: COMMON_HEADER})
        .pipe(
            timeout(20 * 60* 1000)
            );
  }

  templates(): Observable<OutputTypes[]>{
    return this.httpClient.get<OutputTypes[]>(this.templateUrl);
  }
}
