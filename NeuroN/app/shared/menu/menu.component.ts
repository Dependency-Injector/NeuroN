import { Component, Input, Output, EventEmitter } from '@angular/core';

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

export class MenuComponent {
}