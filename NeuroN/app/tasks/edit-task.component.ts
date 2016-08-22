import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
/*import { DatePicker } from 'ng2-datepicker';*/
import { ITask, Task } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'nn-edit-task',
    templateUrl: 'app/tasks/edit-task.component.html',
    styleUrls: ['app/tasks/edit-task.component.css']
    /*directives: [DatePicker]*/
})

export class EditTaskComponent implements OnChanges {
    @Input() taskId: number;
    @Output() taskCreated: EventEmitter<ITask> = new EventEmitter<ITask>();

    private task: ITask;
    private isInEditMode: boolean = false;

    private title: string;
    private deadline: any;

    constructor(private taskService: TaskService) {
    }

    ngOnChanges(changes): void {
        if (changes.taskId) {
            this.taskId = changes.taskId.currentValue;

            if (this.taskId == null) {
                this.task = this.taskService.createNewEmptyTask();
                this.isInEditMode = false;
            } else {
                this.task = this.taskService.getTask(this.taskId);
                this.title = this.task.title;
                this.deadline = this.task.deadline;
                this.isInEditMode = true;
            }
        }
    }

    create(): void {
        let newTask: ITask = this.taskService.createNewTask(this.title, this.deadline);
        //this.taskService.saveTask(newTask);
        this.taskService.addTodo(newTask);
        this.clear();
    }

    remove(): void {
        this.taskService.removeTask(this.task);
    }

    saveChanges(): void {
        this.task.title = this.title;
        this.task.deadline = this.deadline;

        this.taskService.addTodo(this.task)
            .subscribe(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                });

        //this.taskService.saveTask(this.task);
        this.clear();
    }

    discardChanges(): void {
        this.clear();
    }

    clear(): void {
        this.title = '';
        this.deadline = new Date();
        this.task = this.taskService.createNewEmptyTask();
        this.isInEditMode = false;
    }

    initializeUi(title: string, deadline: string): void {
        this.title = title;
        this.deadline = deadline;
    }
}