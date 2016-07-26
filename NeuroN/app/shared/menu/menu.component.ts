import { Component, OnChanges, Input,
    Output, EventEmitter } from 'angular2/core';

import { MenuItemComponent } from './menu-item.component';

@Component({
    selector: 'nn-menu', 
    templateUrl: 'app/shared/menu/menu.component.html',
    styleUrls: ['app/shared/menu/menu.component.css'],
    host: {
        'class': 'nn-menu-area'
    },
    directives: [MenuItemComponent]
})

export class MenuComponent implements OnChanges {
    //@Input() priority: number;
    //starWidth: number;
    //@Output() priorityClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        //this.starWidth = this.priority * 86 / 5;
    }

    onClick() {
        //this.priorityClicked.emit('The priority ' + this.priority + ' clicked');
    }
}