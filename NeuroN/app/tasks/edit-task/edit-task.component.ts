﻿import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { ITask, Task } from './../shared/task';
import { TaskService } from './../shared/task.service';

@Component({
    selector: 'nn-edit-task',
    templateUrl: 'app/tasks/edit-task/edit-task.component.html',
    styleUrls: ['app/tasks/edit-task/edit-task.component.css']
})

export class EditTaskComponent implements OnChanges {
    @Input() taskId: number;

    private isInEditMode: boolean = false;
    private task: ITask;
    private title: string;
    private deadline: any;
    
    constructor(private taskService: TaskService) {
    }

    ngOnChanges(changes): void {
        if (changes.taskId) {
            this.taskId = changes.taskId.currentValue;

            if (this.taskId == null) {
                this.task = null;
                this.isInEditMode = false;
            } else {
                this.task = this.taskService.getTask(this.taskId);
                this.title = this.task.title;
                this.deadline = this.task.deadline;
                this.isInEditMode = true;
            }
        }
    }

    createNew(): void {
        let newTask: ITask = this.taskService.createNewTask(this.title, this.deadline);
        this.taskService.saveTask(newTask);
        this.clearUi();
    }

    remove(): void {
        this.taskService.removeTask(this.task);
        this.clearUi();
    }

    saveChanges(): void {
        this.task.title = this.title;
        this.task.deadline = this.deadline;

        this.taskService.saveTask(this.task);
        this.clearUi();
    }

    discardChanges(): void {
        this.clearUi();
    }

    clearUi(): void {
        this.title = '';
        this.deadline = new Date();
        this.isInEditMode = false;
    }
}