import { Component, OnInit } from '@angular/core';
import { INotification, Notification } from './shared/notification';
import { NotificationService } from './shared/notification.service';

import { ChannelService, ChannelEvent } from './shared/utilities/channel.service';

class StatusEvent {
    State: string;
    PercentComplete: number;
}

@Component({
    selector: 'nn-notification', 
    templateUrl: 'app/shared/notification/notification.component.html'
}) 

export class NotificationComponent implements OnInit {

    notifications: Notification[];

    messages = "";
    private channel = "tasks";

    constructor(private notificationService: NotificationService, private channelService: ChannelService) {
        this.notifications = new Array<Notification>();
    }

    ngOnInit(): void {
        this.notificationService.notifications.subscribe(notifications => this.notifications = notifications, err => console.log(err));
    }
}