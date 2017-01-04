import { Component, OnInit } from '@angular/core';
import { ProgressService } from './shared/progress.service';
import { TaskService } from './../tasks/shared/task.service';
import { IProgressUnit, ProgressUnit } from './shared/progressUnit';

@Component({
    selector: 'nn-progress',
    templateUrl: 'app/progress/progress.component.html'
})

export class ProgressComponent implements OnInit {
    progressUnits: Array<IProgressUnit>;

    constructor(private progressService: ProgressService, private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.progressService.$progressUnits.subscribe(
            progressUnits => this.progressUnits = progressUnits,
            err => console.log(err));

        this.taskService.$tasks.subscribe(
            () => {
                this.progressService.refresh();
            }
        );
    }
}