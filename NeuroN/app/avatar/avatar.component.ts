import { Component } from '@angular/core';
//import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'app/avatar/avatar.component.html'
})

export class AvatarComponent {
    pageTitle: string = 'avatar page';

    constructor() {
        this.pageTitle = this.pageTitle + " . Route params: ";// + this.routeParams.get('id');
    }
}