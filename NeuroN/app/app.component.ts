import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Router } from '@angular/router';
//import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import 'rxjs/Rx';   

import { ITask, Task } from './tasks/task';
import { AvatarComponent } from './avatar/avatar.component';
import { TodoPageComponent } from './tasks/todo-page.component';
import { TaskDetailsComponent } from './tasks/task-details.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MenuItemComponent } from './shared/menu/menu-item.component';

import { ApiHelper } from './utilities/apiHelper.service';

@Component({
    selector: 'nn-app',
    templateUrl: 'app/app.component.html',
    directives: [MenuComponent, MenuItemComponent],
    providers: [HTTP_PROVIDERS, ApiHelper]
})

/*@RouteConfig([
    { path: '/tasks', name: 'Tasks', component: TodoPageComponent, useAsDefault: true },
    { path: '/avatar', name: 'Avatar', component: AvatarComponent},
    { path: '/task-details/:id', name: 'TaskDetails', component: TaskDetailsComponent}
])*/



export class AppComponent {
    constructor(private router: Router) { }

    pageTitle: string = 'NeuroN FrameworK';
    taskListTitle: string = 'Todo list';

    /*onTaskAdded($event) {
        console.log('Event sent to app: ');
        console.log($event);
        var newTasks: ITask[] = [$event];

        this.tasks = this.tasks.concat(newTasks);
        this.taskListTitle = 'Todo list edited';
    }

    tasks: ITask[] = [];*/

    onRouteSelected(route: string): void {
        console.log(route);
        this.router.navigate([route]);
    }
}