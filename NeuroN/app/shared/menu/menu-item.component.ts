import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nn-menu-item', 
    templateUrl: 'app/shared/menu/menu-item.component.html',
    styleUrls: ['app/shared/menu/menu-item.component.css'],
    host: {
        'class': 'nn-menu-item'
    }
})

export class MenuItemComponent {
    @Input() label: string;
    @Input() icon: string;
    @Input() route: string;
    @Output() menuItemSelected: EventEmitter<string> = new EventEmitter<string>();
    
    menuItemClicked(): void {
        this.menuItemSelected.emit(this.route);
    }
}