import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Configuration} from './configuration';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConfigService {
  private config: Configuration;

  constructor(private http: HttpClient) {}

  load(url: string) {
    return new Promise((resolve) => {
      this.http.get<Configuration>(url).pipe(map(res => res))
        .subscribe(config => {
          this.config = config;
          resolve();
        });
    });
  }

  getConfiguration(): Configuration {
    return this.config;
  }
}
