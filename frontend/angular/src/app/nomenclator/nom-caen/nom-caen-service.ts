import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {TreeNode} from 'primeng/api';

@Injectable()
export class NomCaenService {

  constructor(private http: HttpClient) {
  }

  getFilesystem(): any {
    return this.http.get<any>('assets/filesystem.json')
      .toPromise()
      .then(res => <TreeNode[]> res.data);
  }

  getLazyFilesystem(): any {
    return this.http.get<any>('assets/filesystem-lazy.json')
      .toPromise()
      .then(res => <TreeNode[]> res.data);
  }
}
