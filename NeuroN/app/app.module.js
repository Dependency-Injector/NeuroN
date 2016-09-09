System.register(['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', 'ng2-bootstrap/ng2-bootstrap', './app.routing', './app.component', './shared/menu/menu.component', './shared/menu/menu-item.component', './tasks/todo-page.component', './tasks/edit-task/edit-task.component', './tasks/task-list/task-list.component', './blog/blog.component', './blog/blog-entry-list/blog-entry-list.component', './blog/edit-blog-entry/edit-blog-entry.component', './avatar/avatar.component', './tasks/shared/task.service', './blog/shared/blog.service', './avatar/shared/avatar.service', './utilities/apiHelper.service'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, http_1, ng2_bootstrap_1, app_routing_1, app_component_1, menu_component_1, menu_item_component_1, todo_page_component_1, edit_task_component_1, task_list_component_1, blog_component_1, blog_entry_list_component_1, edit_blog_entry_component_1, avatar_component_1, task_service_1, blog_service_1, avatar_service_1, apiHelper_service_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (menu_item_component_1_1) {
                menu_item_component_1 = menu_item_component_1_1;
            },
            function (todo_page_component_1_1) {
                todo_page_component_1 = todo_page_component_1_1;
            },
            function (edit_task_component_1_1) {
                edit_task_component_1 = edit_task_component_1_1;
            },
            function (task_list_component_1_1) {
                task_list_component_1 = task_list_component_1_1;
            },
            function (blog_component_1_1) {
                blog_component_1 = blog_component_1_1;
            },
            function (blog_entry_list_component_1_1) {
                blog_entry_list_component_1 = blog_entry_list_component_1_1;
            },
            function (edit_blog_entry_component_1_1) {
                edit_blog_entry_component_1 = edit_blog_entry_component_1_1;
            },
            function (avatar_component_1_1) {
                avatar_component_1 = avatar_component_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            },
            function (blog_service_1_1) {
                blog_service_1 = blog_service_1_1;
            },
            function (avatar_service_1_1) {
                avatar_service_1 = avatar_service_1_1;
            },
            function (apiHelper_service_1_1) {
                apiHelper_service_1 = apiHelper_service_1_1;
            }],
        execute: function() {
            let AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        // Angular modules
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        // External modules
                        ng2_bootstrap_1.DatepickerModule,
                        app_routing_1.routing
                    ],
                    declarations: [
                        // Application
                        app_component_1.AppComponent,
                        menu_component_1.MenuComponent,
                        menu_item_component_1.MenuItemComponent,
                        // Todo page
                        todo_page_component_1.TodoPageComponent,
                        edit_task_component_1.EditTaskComponent,
                        task_list_component_1.TaskListComponent,
                        // Blog page
                        blog_component_1.BlogComponent,
                        blog_entry_list_component_1.BlogEntryListComponent,
                        edit_blog_entry_component_1.EditBlogEntryComponent,
                        // Avatar page
                        avatar_component_1.AvatarComponent
                    ],
                    providers: [
                        task_service_1.TaskService,
                        blog_service_1.BlogService,
                        avatar_service_1.AvatarService,
                        apiHelper_service_1.ApiHelper
                    ],
                    bootstrap: [app_component_1.AppComponent]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map