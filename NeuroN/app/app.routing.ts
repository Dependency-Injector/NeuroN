import { Routes, RouterModule } from '@angular/router';

import { TodoPageComponent } from './tasks/todo-page.component';
import { TaskDetailsComponent } from './tasks/task-details.component';
import { AvatarComponent } from './avatar/avatar.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TodoPageComponent
    },
    {
        path: 'avatar',
        component: AvatarComponent
    }/*,
    {
        path: 'task-details/:id',
        component: TaskDetailsComponent
    }*/
];

export const routing = RouterModule.forRoot(appRoutes);

/*

import { ITask, Task } from './tasks/task';
import { TaskDetailsComponent } from './tasks/task-details.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MenuItemComponent } from './shared/menu/menu-item.component';

import { ApiHelper } from './utilities/apiHelper.service';

@Component({
    selector: 'nn-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, MenuComponent, MenuItemComponent],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, ApiHelper]
})

@RouteConfig([
    { path: '/tasks', name: 'Tasks', component: TodoPageComponent, useAsDefault: true },
    { path: '/avatar', name: 'Avatar', component: AvatarComponent },
    { path: '/task-details/:id', name: 'TaskDetails', component: TaskDetailsComponent }
])
*/
