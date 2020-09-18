import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AppConfigModel} from './app.config.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private config: AppConfigModel;

  constructor(private http: HttpClient) {}

  load(url: string) {
    return new Promise((resolve) => {
      this.http.get<AppConfigModel>(url).pipe(map(res => res))
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
