﻿import { Component } from 'angular2/core';
import 'rxjs/Rx';   // load all features

import { ITask, Task } from './task';
import { TaskListComponent } from './task-list.component';
import { EditTaskComponent } from './edit-task.component';
import { TaskService } from './task.service';

@Component({
    templateUrl: 'app/tasks/todo-page.component.html',
    directives: [TaskListComponent, EditTaskComponent],
    providers: [TaskService]
})

export class TodoPageComponent {
    pageTitle: string = 'Todo page';
    taskListTitle: string = 'Todo list';
    editedTaskId: number = null;

    onTaskCreated($event) {
        console.log('Event sent to app: ');
        console.log($event);
        var newTasks: ITask[] = [$event];

        this.tasks = this.tasks.concat(newTasks);
        this.taskListTitle = 'Todo list edited';
    }

    onEditTask($event) {
        this.editedTaskId = $event;
    }

    tasks: ITask[] = [];
}