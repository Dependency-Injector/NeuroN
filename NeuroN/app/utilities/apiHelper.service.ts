import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()

export class ApiHelper {
    private useLocalApi: boolean;
    private azureApiUrl: string = 'http://apineuro.azurewebsites.net/api/';
    private localApiUrl: string = 'http://localhost:2243/api/';
    private jsonHeaders: Headers;

    constructor() {
        this.useLocalApi = true;
        this.jsonHeaders = this.createDefaultJsonHeaders();
    }

    createDefaultJsonHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers;
    }

    getApiUrl(): string {
        if (this.useLocalApi)
            return this.localApiUrl;
        else
            return this.azureApiUrl;
    }

    getJsonHeaders(): Headers {
        return this.jsonHeaders;
    }

}