import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';

@Component({
    templateUrl: 'app/avatar/avatar.component.html'
})

export class AvatarComponent {
    pageTitle: string = 'avatar page';

    constructor(private routeParams: RouteParams) {
        this.pageTitle = this.pageTitle + " . Route params: " + this.routeParams.get('id');
    }
}