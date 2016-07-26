import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import 'rxjs/Rx';   

import { ITask, Task } from './tasks/task';
import { AvatarComponent } from './avatar/avatar.component';
import { TodoPageComponent } from './tasks/todo-page.component';
import { TaskDetailsComponent } from './tasks/task-details.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MenuItemComponent } from './shared/menu/menu-item.component';

@Component({
    selector: 'nn-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, MenuComponent, MenuItemComponent],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS]
})

@RouteConfig([
    { path: '/tasks', name: 'Tasks', component: TodoPageComponent, useAsDefault: true },
    { path: '/avatar', name: 'Avatar', component: AvatarComponent},
    { path: '/task-details/:id', name: 'TaskDetails', component: TaskDetailsComponent}
])

export class AppComponent {
    pageTitle: string = 'Acme product management';
    taskListTitle: string = 'Todo list';

    /*onTaskAdded($event) {
        console.log('Event sent to app: ');
        console.log($event);
        var newTasks: ITask[] = [$event];

        this.tasks = this.tasks.concat(newTasks);
        this.taskListTitle = 'Todo list edited';
    }

    tasks: ITask[] = [];*/
    onRouteSelected($event: string): void {
        console.log($event);
    }
}