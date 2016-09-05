import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { IBlogEntry } from './blog-entry';
import { BlogService } from './blog.service';

@Component({
    selector: 'nn-blog-entry-list',
    templateUrl: 'app/blog/blog-entry-list.component.html',
    styleUrls: ['app/blog/blog-entry-list.component.css']
    //pipes: [TaskFilterPipe],
    //directives: [StarComponent, ROUTER_DIRECTIVES]
})

export class BlogEntryListComponent implements OnInit, OnChanges {
    //@Output() editTaskClicked: EventEmitter<number> = new EventEmitter<number>();
    
    entries: IBlogEntry[];
    pageTitle: string = 'Blog entries';

    constructor(private blogService: BlogService) {
    }
    
    editTask(taskId: number): void {
        //this.editTaskClicked.emit(taskId);
    }
    
    ngOnInit(): void {
        this.blogService.entries.subscribe((entries: IBlogEntry[]) => {
            this.entries = entries;
            console.log('blog entries obtained');
        });
    }

    ngOnChanges(changes): void {
        //if (changes.tasks)
        //    this.entries = changes.tasks.currentValue;
    }
}