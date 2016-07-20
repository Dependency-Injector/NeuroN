import { Component, Input, Output, OnChanges, EventEmitter } from 'angular2/core'
import { ITask, Task } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'nn-edit-task',
    templateUrl: 'app/tasks/edit-task.component.html',
    styleUrls: ['app/tasks/edit-task.component.css']
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
        this.taskService.saveTask(newTask);
        this.clear();
    }

    saveChanges(): void {
        this.task.title = this.title;
        this.task.deadline = this.deadline;
        this.taskService.saveTask(this.task);
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
}