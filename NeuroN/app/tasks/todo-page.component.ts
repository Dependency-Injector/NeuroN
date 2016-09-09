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
    //taskListTitle: string = 'Todo list';
    editedTaskId: number = null;

    //editedTaskId: ITask = null;

    onTaskCreated($event) {
        console.log('Event sent to app: ');
        console.log($event);
        var newTasks: ITask[] = [$event];

        this.tasks = this.tasks.concat(newTasks);
        //this.taskListTitle = 'Todo list edited';
    }

    onEditTask($event) {
        //this.editedTaskId = $event;
        this.editedTaskId = $event;
    }

    tasks: ITask[] = [];
}