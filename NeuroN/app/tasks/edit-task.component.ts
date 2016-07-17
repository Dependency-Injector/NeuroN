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
    task: Task;

    constructor(private taskService: TaskService) {
    }

    add(): void {
        this.task = new Task(4, this.title, this.priority, this.deadline, false, '');
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
        this.deadline = '';
    }
}