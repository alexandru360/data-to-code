import {Injectable, isDevMode} from '@angular/core';
import {Configuration} from '../classes/config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ConfigService {
  private config: Configuration;

  constructor(private http: HttpClient) {
    this.config = new Configuration();
  }

  load(url: string): any {
    return new Promise((resolve) => {
      this.http.get<Configuration>(url).pipe(map(res => res))
        .subscribe(config => {
          this.config = config;
          if (isDevMode()) {
            console.log(this.config);
          }
          resolve();
        });
    });
  }

  getConfiguration(): Configuration {
    return this.config;
  }
}
