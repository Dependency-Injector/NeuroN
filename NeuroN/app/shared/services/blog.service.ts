import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IBlogPost } from '../interfaces';
import { ItemsService } from '../utilities/items.service';
import { ConfigService } from '../utilities/config.service';

@Injectable()
export class BlogService {
    private baseUrl: string;

    constructor(private http: Http, private itemsService: ItemsService, private configService: ConfigService) {
        this.baseUrl = configService.getApiUrl();
    }    

    getPosts(): Observable<IBlogPost[]> {
        return this.http.get(this.baseUrl + 'blog')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('ERROR in BlogService');
        console.log(error);

        return Observable.throw('error aplikacji');
    }
}
