import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ITask } from './../shared/task';
import { TaskFilterPipe } from './../shared/task-filter.pipe';
import { StarComponent } from '../../shared/star/star.component';
import { TaskService } from './../shared/task.service';

@Component({
    selector: 'nn-task-list',
    templateUrl: 'app/tasks/task-list/task-list.component.html',
    styleUrls: ['app/tasks/task-list/task-list.component.css']
})

export class TaskListComponent implements OnInit, OnChanges {
    @Input() tasks: Array<ITask> = new Array<ITask>();
    @Input() title: string;
    @Output() editTaskClicked: EventEmitter<ITask> = new EventEmitter<ITask>();

    constructor(private taskService: TaskService) {
    }

    editTask(task: ITask): void {
        this.editTaskClicked.emit(task);
    }

    finishTask(taskId: number): void {
        this.taskService.finishTask(taskId);
    }

    setDate(date: string): Date {
        return new Date(date);
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes): void {
        if (changes.tasks)
            this.tasks = changes.tasks.currentValue;
    }
}