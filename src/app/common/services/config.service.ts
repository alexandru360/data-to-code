import {Injectable} from '@angular/core';
import {SecurityConfiguration} from '../classes/config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ConfigService {
  private config: SecurityConfiguration;

  constructor(private http: HttpClient) {
  }

  load(url: string) {
    return new Promise((resolve) => {
      this.http.get<SecurityConfiguration>(url).pipe(map(res => res))
        .subscribe(config => {
          this.config = config;
          // console.log(this.config.endpoints, this.config.endpoints);
          resolve();
        });
    });
  }

  getConfiguration(): SecurityConfiguration {
    return this.config;
  }
}
