import { Component, OnChanges, Input,
    Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nn-star', // neuron-star
    templateUrl: 'app/shared/star/star.component.html',
    styleUrls: ['app/shared/star/star.component.css']
})

export class StarComponent implements OnChanges {
    @Input() priority: number;
    starWidth: number;
    @Output() priorityClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.starWidth = this.priority * 86 / 5;
    }

    onClick() {
        this.priorityClicked.emit('The priority ' + this.priority + ' clicked');
    }
}