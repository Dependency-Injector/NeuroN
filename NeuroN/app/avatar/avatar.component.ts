import { Component, OnInit } from '@angular/core';
import { AvatarService } from './shared/avatar.service';
import { IAvatar } from './shared/avatar';

@Component({
    templateUrl: 'app/avatar/avatar.component.html'
})

export class AvatarComponent implements OnInit {
    avatar: IAvatar;

    constructor(private avatarService: AvatarService) {
    }

    ngOnInit(): void {
        this.avatarService.avatar.subscribe(
            avatar => this.avatar = avatar,
            err => console.log(err));
    }
}