System.register(['@angular/router', './tasks/todo-page.component', './avatar/avatar.component', './blog/blog.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, todo_page_component_1, avatar_component_1, blog_component_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (todo_page_component_1_1) {
                todo_page_component_1 = todo_page_component_1_1;
            },
            function (avatar_component_1_1) {
                avatar_component_1 = avatar_component_1_1;
            },
            function (blog_component_1_1) {
                blog_component_1 = blog_component_1_1;
            }],
        execute: function() {
            appRoutes = [
                {
                    path: '',
                    redirectTo: '/blog',
                    pathMatch: 'full'
                },
                {
                    path: 'tasks',
                    component: todo_page_component_1.TodoPageComponent
                },
                {
                    path: 'avatar',
                    component: avatar_component_1.AvatarComponent
                },
                {
                    path: 'blog',
                    component: blog_component_1.BlogComponent
                } /*,
                {
                    path: 'task-details/:id',
                    component: TaskDetailsComponent
                }*/
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
//# sourceMappingURL=app.routing.js.map