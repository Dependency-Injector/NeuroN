import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DisplayOptions } from "./../shared/display-options";

@Component({
    selector: 'nn-display-options',
    templateUrl: 'app/tasks/display-options/display-options.component.html'
})

export class DisplayOptionsComponent {
    @Input() options: DisplayOptions;
    @Output() optionsChanged: EventEmitter<DisplayOptions>;

    constructor() {
        this.options = new DisplayOptions();
        this.optionsChanged = new EventEmitter<DisplayOptions>();
    }

    setFinishedTasksVisibility(show: boolean) {
        this.options.finishedTasksVisible = show;
        this.optionsChanged.emit(this.options);
    }

    setOverdueTasksVisibility(show: boolean) {
        this.options.overdueTasksVisible = show;
        this.optionsChanged.emit(this.options);
    }
}