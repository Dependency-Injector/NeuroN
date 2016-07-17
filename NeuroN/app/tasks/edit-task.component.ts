import { Component, Output, EventEmitter } from 'angular2/core'
import { ITask, Task } from './task';

@Component({
    selector: 'nn-edit-task',
    templateUrl: 'app/tasks/edit-task.component.html',
    styleUrls: ['app/tasks/edit-task.component.css']
})

export class EditTaskComponent {
    title: string;
    deadline: any;
    priority: number;
    task: Task;

    @Output() taskAdded: EventEmitter<ITask> = new EventEmitter<ITask>();

    add(): void {
        this.task = new Task(4, this.title, this.priority, this.deadline, false, '');

        this.taskAdded.emit(this.task);

        console.log('added task: ');
        console.log(this.task);

        this.clear();
    }

    saveChanges(): void {
        
    }

    discardChanges(): void {
        
    }

    clear(): void {
        this.title = '';
        this.priority = 0;
        this.deadline = '';
    }
}