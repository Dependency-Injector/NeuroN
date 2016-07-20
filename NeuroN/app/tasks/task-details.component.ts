import { Component } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';

@Component({
    templateUrl: 'app/tasks/task-details.component.html'
})

export class TaskDetailsComponent {
    pageTitle: string = 'Task details';

    constructor(private _routeParams: RouteParams, private _router: Router) {
        let id = +this._routeParams.get('id');
        this.pageTitle += `: ${id}`;
    }

    onBack(): void {
        this._router.navigate(['Tasks']);
    }
}