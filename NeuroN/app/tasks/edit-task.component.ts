import { Component, Output, EventEmitter } from 'angular2/core'
import { ITask, Task } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'nn-edit-task',
    templateUrl: 'app/tasks/edit-task.component.html',
    styleUrls: ['app/tasks/edit-task.component.css']
})

export class EditTaskComponent {
    @Output() taskAdded: EventEmitter<ITask> = new EventEmitter<ITask>();

    title: string;
    deadline: any;
    priority: number;
    task: ITask;

    constructor(private taskService: TaskService) {
        this.clear();
    }

    add(): void {
        this.task = new Task;
        this.task.title = this.title;
        this.task.deadline = this.deadline;
        this.task.isFinished = false;
        this.task.priority = 2;
        
        this.taskService.addTask(this.task);
        this.clear();
    }

    saveChanges(): void {
    }

    discardChanges(): void {
        this.clear();
    }

    clear(): void {
        this.title = '';
        this.priority = 0;
        this.deadline = new Date();

    }
}