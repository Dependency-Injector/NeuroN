import { Component } from '@angular/core';
import 'rxjs/Rx';   // load all features

import { ITask, Task } from './shared/task';
import { TaskListComponent } from './task-list/task-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskService } from './shared/task.service';

@Component({
    templateUrl: 'app/tasks/todo-page.component.html'
})

export class TodoPageComponent {
    pageTitle: string = 'Todo page';
    editedTaskId: number = null;

    onEditTask($event) {
        this.editedTaskId = $event;
    }
}