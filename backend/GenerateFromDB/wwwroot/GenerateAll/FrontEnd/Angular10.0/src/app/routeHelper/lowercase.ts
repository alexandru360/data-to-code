@{
	var angular="@angular";
}
import { DefaultUrlSerializer, UrlTree } from '@angular/router';
/*
use with
providers: [
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        }
    ]
    */
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        
        return super.parse(url.toLowerCase());
    }
}