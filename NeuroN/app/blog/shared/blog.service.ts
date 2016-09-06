import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBlogEntry, BlogEntry } from './blog-entry';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
import { ApiHelper } from './../../utilities/apiHelper.service';

@Injectable()

export class BlogService {
    private azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/post';
    private localApiUrl = 'http://localhost:2243/api/post';
    
    private stream: BehaviorSubject<IBlogEntry[]>;
    private _posts: Array<IBlogEntry>;
    private requestOptions: RequestOptions;
    
    constructor(private http: Http, private apiHelper: ApiHelper) {
        this.stream = new BehaviorSubject(new Array<IBlogEntry>());
        this._posts = new Array<IBlogEntry>();
        this.requestOptions = new RequestOptions({ headers: apiHelper.getJsonHeaders() });
        this.loadAll();
    }

    get posts() {
        return this.stream.asObservable();
    }

    loadAll(): void {
        this.http.get(this.localApiUrl)
            .map((response: Response) => response.json())
            .subscribe(data => {
                this._posts = data;
                this.stream.next(this._posts);
            },
            error => {
                console.log('Could not load blog posts. Error: ');
                console.log(error);
            });
    }
    
    addPost(post: BlogEntry): void {
        this.http.post(this.localApiUrl, JSON.stringify(post), this.requestOptions)
            .map((response: Response) => response.json())
            .subscribe(data => {
                this._posts.push(data);
                this.stream.next(this._posts);
            }, error => console.log('Could not create blog post.'));
    }

    updatePost(post: BlogEntry): void {
        this.http.put(`${this.localApiUrl}/${post.id}`, JSON.stringify(post), this.requestOptions)
            .map((response: Response) => response.json())
            .subscribe(data => {
                this._posts.forEach((post, i) => {
                    if (post.id === data.id) {
                        this._posts[i] = data;
                    }
                });

                this.stream.next(this._posts);
            }, error => console.log('Could not update blog post.'));
    }

    removePost(id: number): void {
        this.http.delete(`${this.localApiUrl}/${id}`).subscribe(response => {
            this._posts.forEach((post, i) => {
                if (post.id === id) {
                    this._posts.splice(i, 1);
                }
            });

            this.stream.next(this._posts);
        }, error => console.log('Could not remove blog post.'));
    }
}