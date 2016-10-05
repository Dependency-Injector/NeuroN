import { Component, OnInit, Input } from '@angular/core';
import { INotification, Notification } from './shared/notification';
import { NotificationService } from './shared/notification.service';
import {Http, Response} from '@angular/http';
import {ChannelService, ChannelEvent } from "../utilities/channel.service";

class StatusEvent {
    State: string;
    PercentComplete: number;
}

@Component({
    selector: 'nn-notification',
    templateUrl: 'app/shared/notification/notification.component.html'
})

export class NotificationComponent implements OnInit {
    @Input() eventName: string;
    @Input() apiUrl: string;
    
    notifications: Notification[];

    messages = "";
    private channel = "tasks";

    constructor(private notificationService: NotificationService, private channelService: ChannelService, private http: Http) {
        this.notifications = new Array<Notification>();
    }

    ngOnInit(): void {
        //this.notificationService.notifications.subscribe(notifications => this.notifications = notifications, err => console.log(err));

        this.channelService.sub(this.channel).subscribe(
            (x: ChannelEvent) => {
                switch (x.Name) {
                    case this.eventName:
                        {
                            this.appendStatusUpdate(x);
                        }
                }
            }, (error: any) => { console.warn('Attempt to join channel failed!', error); })
    }

    private appendStatusUpdate(ev: ChannelEvent): void {
        let date = new Date();
        switch(ev.Data.State) {
            case 'starting':{
                this.messages = `${date.toLocaleTimeString()} : starting\n` + this.messages;
                break;
            }

            case 'complete': {
                this.messages = `${date.toLocaleTimeString()} : complete\n` + this.messages;
                break;
            }

            default: {
                this.messages = `${date.toLocaleTimeString()} : ${ev.Data.State} : ${ev.Data.PercentComplete} % complete\n` + this.messages;
                break;
            }
        }
    }

    callApi() {
        this.http.get(this.apiUrl)
            .map((res: Response) => res.json())
            .subscribe((message: string) => { console.log(message); });
    }
}