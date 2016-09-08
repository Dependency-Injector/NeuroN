import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    private apiUrl: string;

    private useLocalApi: boolean;
    private azureApiUrl: string = 'http://apineuro.azurewebsites.net/api/';
    private localApiUrl: string = 'http://localhost:2243/api/';
    

    constructor() {
        this.localApiUrl = 'http://localhost:2243/api/';
        this.azureApiUrl = 'http://apineuro.azurewebsites.net/api/';
        this.useLocalApi = true;
    }    

    getApiUrl(): string {
        if(this.useLocalApi) 
            return this.localApiUrl;
        else 
            return this.azureApiUrl;
    }

    getApiHost(): string {
        return this.getApiUrl().replace('api/', '');
    }
}
