import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ITask } from './task';
import { TaskFilterPipe } from './task-filter.pipe';
import { StarComponent } from '../shared/star.component';
import { TaskService } from './task.service';

@Component({
    selector: 'nn-task-list',
    templateUrl: 'app/tasks/task-list.component.html',
    styleUrls: ['app/tasks/task-list.component.css'],
    pipes: [TaskFilterPipe],
    directives: [StarComponent, ROUTER_DIRECTIVES]
})

export class TaskListComponent implements OnInit, OnChanges {
    @Input() pageTitle: string;
    @Output() editTaskClicked: EventEmitter<number> = new EventEmitter<number>();

    constructor(private taskService: TaskService) {
    }
    
    tasks: ITask[];
    imageHeight: number = 50;
    imageWidth: number = 40;
    showImage: boolean = false;
    listFilter: string = 'task';

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    editTask(taskId: number): void {
        this.editTaskClicked.emit(taskId);
    }

    finishTask(taskId: number): void {
        this.taskService.finishTask(taskId);
    }

    errorMessage: any;

    setDate(date: string): Date {
        return new Date(date);
    }

    ngOnInit(): void {
        this.taskService.todos.subscribe((tasks: ITask[]) => {
            this.tasks = tasks;
            console.log('task list has new list');
        });

/*
        this.taskService.getTasks()
            .subscribe((tasks: ITask[]) => {
                this.tasks = tasks;
                console.log('tasks list updated in task-list');
            });
*/
    }

    ngOnChanges(changes): void {
        if (changes.tasks)
            this.tasks = changes.tasks.currentValue;

        console.log('sth changed');
        console.log(changes);
    }

    onPriorityClicked(message: string): void {
        this.pageTitle = "Product list " + message;
    }

}