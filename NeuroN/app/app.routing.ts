import { Routes, RouterModule } from '@angular/router';

import { TodoPageComponent } from './tasks/todo-page.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { AvatarComponent } from './avatar/avatar.component';

import { BlogComponent } from './blog/blog.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/blog',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: TodoPageComponent
    },
    {
        path: 'avatar',
        component: AvatarComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    }/*,
    {
        path: 'task-details/:id',
        component: TaskDetailsComponent
    }*/
];

export const routing = RouterModule.forRoot(appRoutes);