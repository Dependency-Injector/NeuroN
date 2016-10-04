import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationComponent } from './shared/notification/notification.component';

@Component({
    selector: 'nn-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    constructor(private router: Router) { }

    pageTitle: string = 'NeuroN FrameworK';
    taskListTitle: string = 'Todo list';
    
    onRouteSelected(route: string): void {
        console.log(route);
        this.router.navigate([route]);
    }
}