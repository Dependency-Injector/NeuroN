import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ITask, Task } from './task';
import { TaskService } from './task.service';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'nn-edit-task',
    templateUrl: 'app/tasks/edit-task.component.html',
    styleUrls: ['app/tasks/edit-task.component.css'],
    directives: [AlertComponent, DATEPICKER_DIRECTIVES]
})

export class EditTaskComponent implements OnChanges {
    @Input() taskId: number;
    @Output() taskCreated: EventEmitter<ITask> = new EventEmitter<ITask>();

    private isInEditMode: boolean = false;

    private title: string;
    private deadline: any;

    private task: ITask;

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
    }

    saveChanges(): void {
        this.task.title = this.title;
        this.task.deadline = this.deadline;

        this.taskService.saveTask(this.task);
/*
            .addTodo(this.task)
            .subscribe(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                });
*/

        //this.taskService.saveTask(this.task);
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

    initializeUi(title: string, deadline: string): void {
        //this.title = title;
        //this.deadline = deadline;
    }
}