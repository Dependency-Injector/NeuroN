import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { INotification, Notification } from './notification';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
import { ApiHelper } from './../../../utilities/apiHelper.service';

@Injectable()

export class NotificationService {
    private azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/notifications';
    private localApiUrl = 'http://localhost:2243/api/notifications';
    
    private stream: BehaviorSubject<INotification[]>;
    private _notifications: Array<INotification>;
    private requestOptions: RequestOptions;
    
    constructor(private http: Http, private apiHelper: ApiHelper) {
        this.stream = new BehaviorSubject(new Array<INotification>());
        this._notifications = new Array<INotification>();
        this.requestOptions = new RequestOptions({ headers: apiHelper.getJsonHeaders() });
        this.loadAll();
    }

    get notifications() {
        return this.stream.asObservable();
    }

    loadAll(): void {
        this.http.get(this.localApiUrl)
            .map((response: Response) => response.json())
            .subscribe(data => {
                this._notifications = data;
                this.stream.next(this._notifications);
            },
            error => {
                console.log('Could not load blog notifications. Error: ');
                console.log(error);
            });
    }
    
    addNotification(post: Notification): void {
        this.http.post(this.localApiUrl, JSON.stringify(post), this.requestOptions)
            .map((response: Response) => response.json())
            .subscribe(data => {
                this._notifications.push(data);
                this.stream.next(this._notifications);
            }, error => console.log('Could not create notification.'));
    }

    updateNotification(post: Notification): void {
        this.http.put(`${this.localApiUrl}/${post.id}`, JSON.stringify(post), this.requestOptions)
            .map((response: Response) => response.json())
            .subscribe(data => {
                this._notifications.forEach((post, i) => {
                    if (post.id === data.id) {
                        this._notifications[i] = data;
                    }
                });

                this.stream.next(this._notifications);
            }, error => console.log('Could not update notification.'));
    }

    removeNotification(id: number): void {
        this.http.delete(`${this.localApiUrl}/${id}`).subscribe(response => {
            this._notifications.forEach((post, i) => {
                if (post.id === id) {
                    this._notifications.splice(i, 1);
                }
            });

            this.stream.next(this._notifications);
        }, error => console.log('Could not remove notification.'));
    }
}