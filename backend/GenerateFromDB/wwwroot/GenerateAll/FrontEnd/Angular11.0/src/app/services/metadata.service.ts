@{
	var Inject="@Inject";
	var angular="@angular";
	var Injectable="@Injectable";
}
import { environment } from './../../environments/environment';
import { HttpClient } from '@(angular)/common/http';
import { Injectable, Inject } from '@(angular)/core';
import { Observable } from 'rxjs';
import { APP_BASE_HREF } from '@(angular)/common';
import { MetadataTables } from './MetadataTables';

@(Injectable)({
  providedIn: 'root'
})
export class metadataService {

  baseUrl: string;
  constructor(@(Inject)(APP_BASE_HREF) baseHref: string, private client: HttpClient) { 
    this.baseUrl = environment.webAPIUrl + baseHref ;
    console.log(environment.webAPIUrl );
    console.log(baseHref);
    console.log(this.baseUrl);
    

  }
  public GetTables(): Observable<MetadataTables[]>{
    const url = this.baseUrl+'api/Metadata/Tables';
    
    return this.client.get<MetadataTables[]>(url);
  }

}


