﻿import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { IBlogEntry } from './../shared/blog-entry';
import { BlogService } from './../shared/blog.service';

@Component({
    selector: 'nn-blog-entry-list',
    templateUrl: 'app/blog/blog-entry-list/blog-entry-list.component.html',
    styleUrls: ['app/blog/blog-entry-list/blog-entry-list.component.css']
})

export class BlogEntryListComponent implements OnInit {
    @Output() editPostClicked: EventEmitter<number> = new EventEmitter<number>();
    
    posts: IBlogEntry[];
    pageTitle: string = 'Blog entries';

    constructor(private blogService: BlogService) {
        this.posts = new Array<IBlogEntry>();
    }
    
    ngOnInit(): void {
        this.blogService.posts.subscribe(posts => this.posts = posts, err => console.log(err));
    }
    
    editPost(postId: number): void {
        this.editPostClicked.emit(postId);
    }

    removePost(postId: number): void {
        this.blogService.removePost(postId);
    }
}