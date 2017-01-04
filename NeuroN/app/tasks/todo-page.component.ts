import { Component, OnInit, OnChanges } from '@angular/core';
import 'rxjs/Rx';

import { ITask, Task } from './shared/task';
import { DisplayOptions } from './shared/display-options';
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
    displayedTasks: ITask[];

    overdueTasks: ITask[];
    todayTasks: ITask[];
    tomorrowTasks: ITask[];
    furtherTasks: ITask[];

    displayOptions: DisplayOptions;

    constructor(private taskService: TaskService) {
        this.editedTask = new Task();
        this.displayOptions = new DisplayOptions();
    }

    onEditTask($event) {
        this.editedTask = $event;
    }

    onOptionsChanged($event) {
        this.displayOptions = $event;
        this.refreshTasksLists();
    }

    ngOnChanges(changes): void {
    }

    refreshTasksLists(): void {
        if (!this.displayOptions.finishedTasksVisible)
            this.displayedTasks = this.tasks.filter(task => task.isFinished === false);
        else
            this.displayedTasks = this.tasks;

        this.overdueTasks = this.displayedTasks.filter(task => task.getRemainingDays() < 0);
        this.todayTasks = this.displayedTasks.filter(task => task.getRemainingDays() === 0);
        this.tomorrowTasks = this.displayedTasks.filter(task => task.getRemainingDays() === 1);
        this.furtherTasks = this.displayedTasks.filter(task => task.getRemainingDays() > 1);
    }

    ngOnInit(): void {
        this.taskService.$tasks.subscribe((tasks: Task[]) => {

            this.tasks = tasks;
            this.refreshTasksLists();
        });
    }
}