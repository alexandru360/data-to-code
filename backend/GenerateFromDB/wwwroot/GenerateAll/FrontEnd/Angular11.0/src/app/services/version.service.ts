@{
  var angular="@angular";
  var Injectable="@Injectable";
  var Inject=@"@Inject";

}
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

@(Injectable)({
  providedIn: 'root'
})
export class VersionService {

  baseUrl: string;
  constructor(@(Inject)(APP_BASE_HREF) baseHref: string, private client: HttpClient) { 
    this.baseUrl = environment.webAPIUrl + baseHref ;
    console.log(environment.webAPIUrl );
    console.log(baseHref);
    console.log(this.baseUrl);
    

  }

  public VersionGenerator() : Observable<string>{
    const url = this.baseUrl+'api/version/VersionGenerator';
    
    return this.client.get(url,{
      responseType: 'text' as const,
    });
  }

  public VersionBackend() : Observable<string>{
    const url = this.baseUrl+'api/version/VersionBackend';
    
    return this.client.get(url,{
      responseType: 'text' as const,
    });
  }



}
