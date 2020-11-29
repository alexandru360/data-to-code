import {HttpHeaders} from '@angular/common/http';

export const COMMON_HEADER = new HttpHeaders().set('Content-Type', 'application/json');

export  const optionsText = {responseType: 'text' as const };

export function realApiRootUrl(apiRootUrl:string): string{

    if (apiRootUrl == null || apiRootUrl === 'null') {
      return '';
    }

    return apiRootUrl;
  }
