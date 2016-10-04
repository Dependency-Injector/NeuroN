import { Component, OnInit } from '@angular/core';
import { INotification, Notification } from './shared/notification';
import { NotificationService } from './shared/notification.service';

@Component({
    selector: 'nn-notification', 
    templateUrl: 'app/shared/notification/notification.component.html'
}) 

export class NotificationComponent implements OnInit {

    notifications: Notification[];

    constructor(private notificationService: NotificationService) {
        this.notifications = new Array<Notification>();
    }

    ngOnInit(): void {
        this.notificationService.notifications.subscribe(notifications => this.notifications = notifications, err => console.log(err));
    }
}