import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AppConfigModel} from './app.config.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private config: AppConfigModel;

  constructor(private http: HttpClient) {}

  load(url: string) {
    return new Promise((resolve) => {
      const headersNoCache = new HttpHeaders({
        'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
    });
      this.http.get<AppConfigModel>(url,{headers: headersNoCache}).pipe(map(res => res))
        .subscribe(config => {
          this.config = config;
          resolve();
        });
    });
  }

  getConfiguration(): AppConfigModel {
    return this.config;
  }
}
