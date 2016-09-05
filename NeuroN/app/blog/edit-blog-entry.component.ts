import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { EmitterService } from './../shared/utilities/emitter.service';
import { BlogService } from './blog.service';

import { IBlogEntry, BlogEntry } from './blog-entry';

@Component({
    selector: 'nn-edit-blog-entry',
    templateUrl: 'app/blog/edit-blog-entry.component.html'
})

export class EditBlogEntryComponent implements OnChanges {
    //@Input() entry: BlogEntry;
    //@Input() listId: string;
    //@Input() editId: string;

    constructor(private blogService: BlogService) {
    }

    private model: BlogEntry = new BlogEntry({ id: null, title: 'sample title', content: 'lorem ipsum dolor sit ', created: new Date() });
    private editing = false;

    submitComment() {
        
    }


    editEntry(): void {
        //EmitterService.get(this.editId).emit(this.entry);
        //this.editTaskClicked.emit(taskId);
    }

    deleteEntry(id: number) {
        this.blogService.removeEntry(id)
            .subscribe(entries => {
                    //EmitterService.get(this.listId).emit(entries);
                },
                err => {
                    console.log("ERROOOOOR przy subskrypcji removeEntry");
                });
    }
    
    ngOnInit(): void {
        this.blogService.entries.subscribe((entries: IBlogEntry[]) => {
            //this.entries = entries;
            console.log('blog entries obtained');
        });
    }

    ngOnChanges(changes) {
        
    }
}