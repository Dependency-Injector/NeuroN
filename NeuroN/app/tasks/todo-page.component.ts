import { Component, OnInit, OnChanges } from '@angular/core';
import 'rxjs/Rx';

import { ITask, Task } from './shared/task';
import { TaskListComponent } from './task-list/task-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskService } from './shared/task.service';

@Component({
    templateUrl: 'app/tasks/todo-page.component.html'
})

export class TodoPageComponent implements OnInit, OnChanges {
    pageTitle: string = 'Todo page';
    editedTask: ITask = null;

    tasks: ITask[];
    overdueTasks: ITask[];
    todayTasks: ITask[];
    tomorrowTasks: ITask[];
    furtherTasks: ITask[];

    constructor(private taskService: TaskService) {
        this.editedTask = new Task();
    }

    onEditTask($event) {
        this.editedTask = $event;
    }

    ngOnChanges(changes): void {
    }
    
    ngOnInit(): void {
        this.taskService.$tasks.subscribe((tasks: Task[]) => {
            this.overdueTasks = tasks.filter(task => task.getRemainingDays() < 0);
            this.todayTasks = tasks.filter(task => task.getRemainingDays() === 0);
            this.tomorrowTasks = tasks.filter(task => task.getRemainingDays() === 1);
            this.furtherTasks = tasks.filter(task => task.getRemainingDays() > 1);
        });
    }
}