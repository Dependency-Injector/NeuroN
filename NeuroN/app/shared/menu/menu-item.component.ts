import { Component, OnChanges, Input,
    Output, EventEmitter } from 'angular2/core';

@Component({
    selector: 'nn-menu-item', 
    templateUrl: 'app/shared/menu/menu-item.component.html',
    styleUrls: ['app/shared/menu/menu-item.component.css'],
    host: {
        'class': 'nn-menu-item'
    }
})

export class MenuItemComponent implements OnChanges {
    @Input() label: string;
    @Input() icon: string;
    @Input() route: string;
    @Output() routeSelected: EventEmitter<string> = new EventEmitter<string>();
    
    ngOnChanges(): void {
    }

    menuItemClicked($event): void {
        this.routeSelected.emit(this.route);
    }
}