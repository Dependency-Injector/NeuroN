import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class SignalrWindow extends Window {
    $: any;
}

export enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Disconnected = 4
}

@Injectable()
export class ChannelService {
    starting: Observable<any>;

    connectionState: Observable<ConnectionState>;
}