import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IProgressUnit, ProgressUnit } from './progressUnit';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
import { ApiHelper } from './../../utilities/apiHelper.service';

@Injectable()

export class ProgressService {
    private azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/userprogress';
    private localApiUrl = 'http://localhost:2243/api/userprogress';

    private stream: BehaviorSubject<Array<ProgressUnit>>;
    private progressUnits: Array<ProgressUnit>;
    private jsonHeaders: RequestOptions;
    
    constructor(private http: Http, private apiHelper: ApiHelper) {
        this.progressUnits = [];
        this.stream = new BehaviorSubject(new Array<ProgressUnit>());
        
        this.jsonHeaders = new RequestOptions({ headers: apiHelper.getJsonHeaders() });
        this.loadProgressUnits();
    }

    get $progressUnits() {
        return this.stream.asObservable();
    }

    loadProgressUnits(): void {
        this.http.get(this.localApiUrl)
            .map((response: Response) => response.json())
            .map((units: Array<IProgressUnit>) => {
                let result: Array<IProgressUnit> = [];
                units.forEach(unit => {
                    result.push(new ProgressUnit(unit));
                });
                return result;
            })
            .subscribe((unitsArray: Array<ProgressUnit>) => {
                this.progressUnits = unitsArray;
                this.stream.next(this.progressUnits);
            },
            error => {
                console.log('Could not load progress units. Error: ');
                console.log(error);
            });
    }

    refresh(): void {
        this.loadProgressUnits();
    }
}