import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ITask } from './task';
import { TaskFilterPipe } from './task-filter.pipe';
import { StarComponent } from '../shared/star.component';
import { TaskService } from './task.service';

@Component({
    selector: 'nn-task-list',
    templateUrl: 'app/tasks/task-list.component.html',
    styleUrls: ['app/tasks/task-list.component.css']
})

export class TaskListComponent implements OnInit, OnChanges {
    @Output() editTaskClicked: EventEmitter<number> = new EventEmitter<number>();
    
    tasks: ITask[];
    imageHeight: number = 50;
    imageWidth: number = 40;
    showImage: boolean = false;
    listFilter: string = 'task';
    errorMessage: any;
    pageTitle: string = 'Todo';

    constructor(private taskService: TaskService) {
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    editTask(taskId: number): void {
        this.editTaskClicked.emit(taskId);
    }

    finishTask(taskId: number): void {
        this.taskService.finishTask(taskId);
    }

    setDate(date: string): Date {
        return new Date(date);
    }

    ngOnInit(): void {
        this.taskService.todos.subscribe((tasks: ITask[]) => {
            this.tasks = tasks;
            console.log('task list has new list');
        });
    }

    ngOnChanges(changes): void {
        if (changes.tasks)
            this.tasks = changes.tasks.currentValue;
    }

    onPriorityClicked(message: string): void {
        //this.pageTitle = "Product list " + message;
    }

}