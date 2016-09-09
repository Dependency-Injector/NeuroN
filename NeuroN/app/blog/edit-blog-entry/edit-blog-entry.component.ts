import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BlogService } from './../shared/blog.service';
import { IBlogEntry, BlogEntry } from './../shared/blog-entry';

@Component({
    selector: 'nn-edit-blog-entry',
    templateUrl: 'app/blog/edit-blog-entry/edit-blog-entry.component.html'
})

export class EditBlogEntryComponent implements OnChanges {
    @Input() postId: number;

    constructor(private blogService: BlogService) {
    }

    private model: BlogEntry = new BlogEntry();
    private editing = false;
    private pageTitle = "Add blog post";

    submitPost() {
        if (!this.editing) {
            this.model.created = new Date();
            this.blogService.addPost(this.model);
        } else {
            this.blogService.updatePost(this.model);
            this.editing = false;
            this.postId = null;
        }

        this.model = new BlogEntry();
    }
    
    ngOnChanges(changes) {
        if (changes.postId) {
            this.postId = changes.postId.currentValue;
        }

        if (this.postId == null) {
            this.model = new BlogEntry();
            this.editing = false;
        } else {
            this.blogService.posts.subscribe(posts => {
                this.model = posts.find(t => t.id === this.postId);
            });
            this.editing = true;
        }
    }

    discardChanges(): void {
        this.postId = null;
        this.editing = false;
        this.model = new BlogEntry();
    }
}