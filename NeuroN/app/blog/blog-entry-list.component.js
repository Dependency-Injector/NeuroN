System.register(['@angular/core', './blog.service'], function(exports_1, context_1) {
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
    var core_1, blog_service_1;
    var BlogEntryListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (blog_service_1_1) {
                blog_service_1 = blog_service_1_1;
            }],
        execute: function() {
            let BlogEntryListComponent = class BlogEntryListComponent {
                constructor(blogService) {
                    this.blogService = blogService;
                    this.editPostClicked = new core_1.EventEmitter();
                    this.pageTitle = 'Blog entries';
                    this.posts = new Array();
                }
                ngOnInit() {
                    this.blogService.posts.subscribe(posts => this.posts = posts, err => console.log(err));
                }
                editPost(postId) {
                    this.editPostClicked.emit(postId);
                }
                removePost(postId) {
                    this.blogService.removePost(postId);
                }
            };
            __decorate([
                core_1.Output(), 
                __metadata('design:type', core_1.EventEmitter)
            ], BlogEntryListComponent.prototype, "editPostClicked", void 0);
            BlogEntryListComponent = __decorate([
                core_1.Component({
                    selector: 'nn-blog-entry-list',
                    templateUrl: 'app/blog/blog-entry-list.component.html',
                    styleUrls: ['app/blog/blog-entry-list.component.css']
                }), 
                __metadata('design:paramtypes', [blog_service_1.BlogService])
            ], BlogEntryListComponent);
            exports_1("BlogEntryListComponent", BlogEntryListComponent);
        }
    }
});
//# sourceMappingURL=blog-entry-list.component.js.map