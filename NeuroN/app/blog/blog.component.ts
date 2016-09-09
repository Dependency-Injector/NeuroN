import { Component } from '@angular/core';
import 'rxjs/Rx';   // load all features

import { BlogEntry } from './shared/blog-entry';
import { BlogEntryListComponent } from './blog-entry-list/blog-entry-list.component';
import { BlogService } from './shared/blog.service';

@Component({
    templateUrl: 'app/blog/blog.component.html'
})

export class BlogComponent {
    pageTitle: string = 'News / updates';

    private editedPostId: number = null;

    onEditPost($event) {
        this.editedPostId = $event;
    }
}