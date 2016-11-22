import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationComponent } from './shared/notification/notification.component';
import { ChannelService, ConnectionState } from './shared/utilities/channel.service';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'nn-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit {
    connectionState: Observable<string>;

    constructor(private router: Router, private channelService: ChannelService) {
       /* this.connectionState = this.channelService.connectionState.map((state: ConnectionState) => {
            return ConnectionState[state];
        });

        this.channelService.error.subscribe(
            (error: any) => { console.warn(error); },
            (error: any) => { console.error("errors$ error", error); });

        this.channelService.starting.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.log("signalr service failed to start"); });*/
    }
    
    onRouteSelected(route: string): void {
        console.log(route);
        this.router.navigate([route]);
    }

    ngOnInit() {
       // console.log("starting channel service");
       // this.channelService.start();
    }
}