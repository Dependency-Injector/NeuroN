import { Component } from 'angular2/core';
import { ITask, Task } from './tasks/task';
import { TaskListComponent } from './tasks/task-list.component';
import { EditTaskComponent } from './tasks/edit-task.component';
import { TaskService } from './tasks/task.service';

@Component({
    selector: 'ne-app',
    templateUrl: 'app/app.component.html',
    directives: [TaskListComponent, EditTaskComponent],
    providers: [TaskService]
})

export class AppComponent {
    pageTitle: string = 'Acme product management';
    taskListTitle: string = 'Todo list';

    onTaskAdded($event) {
        console.log('Event sent to app: ');
        console.log($event);
        var newTasks: ITask[] = [$event];

        this.tasks = this.tasks.concat(newTasks);
        this.taskListTitle = 'Todo list edited';
    }

    tasks: ITask[] = [
        {
            id: 0,
            title: 'task 1',
            priority: 3,
            finished: false,
            deadline: 'today',
            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
        }, {
            id: 1,
            title: 'task 2',
            priority: 1,
            finished: true,
            deadline: 'yesterday',
            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
        }, {
            id: 2,
            title: 'task 3',
            priority: 2,
            finished: false,
            deadline: 'today',
            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
        }
    ];
}