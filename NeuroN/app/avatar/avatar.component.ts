import { Component, OnInit } from '@angular/core';
import { AvatarService } from './shared/avatar.service';
import { IAvatar } from './shared/avatar';

@Component({
    templateUrl: 'app/avatar/avatar.component.html'
})

export class AvatarComponent implements OnInit {
    pageTitle: string = 'avatar page';
    avatar: IAvatar;

    constructor(private avatarService: AvatarService) {
        this.pageTitle = this.pageTitle + " . Route params: ";// + this.routeParams.get('id');
    }

    ngOnInit(): void {
        this.avatarService.avatar.subscribe(
            avatar => this.avatar = avatar,
            err => console.log(err));
    }
}