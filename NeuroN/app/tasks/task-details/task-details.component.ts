import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'app/tasks/task-details/task-details.component.html'
})

export class TaskDetailsComponent {
    pageTitle: string = 'Task details';

    constructor(private route: ActivatedRoute) {
        //let link = ['/detail', hero.id];
        //this.router.navigate(link);
        //let id = +this._routeParams.get('id');
        //this.pageTitle += `: ${id}`;
    }

    onBack(): void {
        //this._router.navigate(['Tasks']);
    }
}