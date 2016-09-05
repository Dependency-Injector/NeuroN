import { Component } from '@angular/core';
import 'rxjs/Rx';   // load all features

import { BlogEntry } from './blog-entry';
//import { BlogEntryListComponent } from './blog-entry-list.component';
import { BlogService } from './blog.service';

@Component({
    templateUrl: 'app/blog/blog.component.html'
})

export class BlogComponent {
    pageTitle: string = 'News / updates';

    //editedTaskId: number = null;
    //editedTaskId: ITask = null;

    onTaskCreated($event) {
        /*console.log('Event sent to app: ');
        console.log($event);
        var newTasks: ITask[] = [$event];
*/
        //this.tasks = this.tasks.concat(newTasks);
        //this.taskListTitle = 'Todo list edited';
    }

    onEditTask($event) {
        //this.editedTaskId = $event;
        //this.editedTaskId = $event;
    }
}