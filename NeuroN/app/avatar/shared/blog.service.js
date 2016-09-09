System.register(['@angular/core', '@angular/http', 'rxjs/add/operator/map', 'rxjs/add/operator/catch', 'rxjs/Rx', './../../utilities/apiHelper.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Rx_1, apiHelper_service_1;
    var BlogService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (apiHelper_service_1_1) {
                apiHelper_service_1 = apiHelper_service_1_1;
            }],
        execute: function() {
            let BlogService = class BlogService {
                constructor(http, apiHelper) {
                    this.http = http;
                    this.apiHelper = apiHelper;
                    this.azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/post';
                    this.localApiUrl = 'http://localhost:2243/api/post';
                    this.stream = new Rx_1.BehaviorSubject(new Array());
                    this._posts = new Array();
                    this.requestOptions = new http_1.RequestOptions({ headers: apiHelper.getJsonHeaders() });
                    this.loadAll();
                }
                get posts() {
                    return this.stream.asObservable();
                }
                loadAll() {
                    this.http.get(this.localApiUrl)
                        .map((response) => response.json())
                        .subscribe(data => {
                        this._posts = data;
                        this.stream.next(this._posts);
                    }, error => {
                        console.log('Could not load blog posts. Error: ');
                        console.log(error);
                    });
                }
                addPost(post) {
                    this.http.post(this.localApiUrl, JSON.stringify(post), this.requestOptions)
                        .map((response) => response.json())
                        .subscribe(data => {
                        this._posts.push(data);
                        this.stream.next(this._posts);
                    }, error => console.log('Could not create blog post.'));
                }
                updatePost(post) {
                    this.http.put(`${this.localApiUrl}/${post.id}`, JSON.stringify(post), this.requestOptions)
                        .map((response) => response.json())
                        .subscribe(data => {
                        this._posts.forEach((post, i) => {
                            if (post.id === data.id) {
                                this._posts[i] = data;
                            }
                        });
                        this.stream.next(this._posts);
                    }, error => console.log('Could not update blog post.'));
                }
                removePost(id) {
                    this.http.delete(`${this.localApiUrl}/${id}`).subscribe(response => {
                        this._posts.forEach((post, i) => {
                            if (post.id === id) {
                                this._posts.splice(i, 1);
                            }
                        });
                        this.stream.next(this._posts);
                    }, error => console.log('Could not remove blog post.'));
                }
            };
            BlogService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http, apiHelper_service_1.ApiHelper])
            ], BlogService);
            exports_1("BlogService", BlogService);
        }
    }
});
//# sourceMappingURL=blog.service.js.map