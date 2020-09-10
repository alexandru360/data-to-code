import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AppConfiguration} from './app.configuration';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private config: AppConfiguration;

  constructor(private http: HttpClient) {}

  load(url: string) {
    return new Promise((resolve) => {
      this.http.get<AppConfiguration>(url).pipe(map(res => res))
        .subscribe(config => {
          this.config = config;
          resolve();
        });
    });
  }

  getConfiguration(): AppConfiguration {
    return this.config;
  }
}
