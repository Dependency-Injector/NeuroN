System.register(['@angular/core', './blog.service', './blog-entry'], function(exports_1, context_1) {
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
    var core_1, blog_service_1, blog_entry_1;
    var EditBlogEntryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (blog_service_1_1) {
                blog_service_1 = blog_service_1_1;
            },
            function (blog_entry_1_1) {
                blog_entry_1 = blog_entry_1_1;
            }],
        execute: function() {
            let EditBlogEntryComponent = class EditBlogEntryComponent {
                constructor(blogService) {
                    this.blogService = blogService;
                    this.model = new blog_entry_1.BlogEntry();
                    this.editing = false;
                    this.pageTitle = "Add blog post";
                }
                submitPost() {
                    if (!this.editing) {
                        this.model.created = new Date();
                        this.blogService.addPost(this.model);
                    }
                    else {
                        this.blogService.updatePost(this.model);
                        this.editing = false;
                        this.postId = null;
                    }
                    this.model = new blog_entry_1.BlogEntry();
                }
                ngOnChanges(changes) {
                    if (changes.postId) {
                        this.postId = changes.postId.currentValue;
                    }
                    if (this.postId == null) {
                        this.model = new blog_entry_1.BlogEntry();
                        this.editing = false;
                    }
                    else {
                        this.blogService.posts.subscribe(posts => {
                            this.model = posts.find(t => t.id === this.postId);
                        });
                        this.editing = true;
                    }
                }
                discardChanges() {
                    this.postId = null;
                    this.editing = false;
                    this.model = new blog_entry_1.BlogEntry();
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Number)
            ], EditBlogEntryComponent.prototype, "postId", void 0);
            EditBlogEntryComponent = __decorate([
                core_1.Component({
                    selector: 'nn-edit-blog-entry',
                    templateUrl: 'app/blog/edit-blog-entry.component.html'
                }), 
                __metadata('design:paramtypes', [blog_service_1.BlogService])
            ], EditBlogEntryComponent);
            exports_1("EditBlogEntryComponent", EditBlogEntryComponent);
        }
    }
});
//# sourceMappingURL=edit-blog-entry.component.js.map