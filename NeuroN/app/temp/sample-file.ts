/*
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ITask } from './../shared/task';
import { TaskService } from './../shared/task.service';

@Component({
    selector: 'task-list',
    templateUrl: 'app/task-list/task-list.component.html'
})

export class TaskListComponent implements OnChanges {
    @Input() tasks: Array<ITask> = new Array<ITask>();
    @Output() editTaskButtonClicked: EventEmitter<ITask> = new EventEmitter<ITask>();

    editTask(task: ITask): void {
        this.editTaskButtonClicked.emit(task);
    }

    ngOnChanges(changes): void {
        if (changes.tasks)
            this.tasks = changes.tasks.currentValue;
    }
}*/

/*import { Component } from '@angular/core';

@Component({
    selector: 'task-list',
    templateUrl: 'app/task-list/task-list.component.html'
})

export class TaskListComponent {
    private taskCount: number = 5;
}*/


/*
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ITask } from './../shared/task';
import { TaskService } from './../shared/task.service';

@Component({
    selector: 'nn-task-list',
    templateUrl: 'app/tasks/task-list/task-list.component.html',
    styleUrls: ['app/tasks/task-list/task-list.component.css']
})

export class TaskListComponent implements OnChanges {
    @Input() tasks: Array<ITask> = new Array<ITask>();
    @Output() editTaskButtonClicked: EventEmitter<ITask> = new EventEmitter<ITask>();
    
    constructor(private taskService: TaskService) {
    }

    editTask(task: ITask): void {
        this.editTaskButtonClicked.emit(task);
    }
    
    ngOnChanges(changes): void {
        if (changes.tasks)
            this.tasks = changes.tasks.currentValue;
    }
}*/