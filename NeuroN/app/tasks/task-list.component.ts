import { Component, Input, OnInit, OnChanges } from 'angular2/core';
import { ITask } from './task';
import { TaskFilterPipe } from './task-filter.pipe';
import { StarComponent } from '../shared/star.component';
import { TaskService } from './task.service';

@Component({
    selector: 'nn-task-list',
    templateUrl: 'app/tasks/task-list.component.html',
    styleUrls: ['app/tasks/task-list.component.css'],
    pipes: [TaskFilterPipe],
    directives: [StarComponent]
})

export class TaskListComponent implements OnInit, OnChanges {
    @Input() pageTitle: string;

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

    errorMessage: any;
    ngOnInit(): void {
        this.taskService.getTasks()
            .subscribe((tasks: ITask[]) => {
                this.tasks = tasks;
                console.log('tasks list updated in task-list');
            });
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