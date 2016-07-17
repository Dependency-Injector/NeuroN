System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', './tasks/task-list.component', './tasks/edit-task.component', './tasks/task.service'], function(exports_1, context_1) {
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
    var core_1, http_1, task_list_component_1, edit_task_component_1, task_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (task_list_component_1_1) {
                task_list_component_1 = task_list_component_1_1;
            },
            function (edit_task_component_1_1) {
                edit_task_component_1 = edit_task_component_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            }],
        execute: function() {
            let AppComponent = class AppComponent {
                constructor() {
                    this.pageTitle = 'Acme product management';
                    this.taskListTitle = 'Todo list';
                    this.tasks = [
                        {
                            id: 0,
                            title: 'task 1',
                            priority: 3,
                            finished: false,
                            deadline: 'today',
                            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
                        }, {
                            id: 1,
                            title: 'task 2',
                            priority: 1,
                            finished: true,
                            deadline: 'yesterday',
                            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
                        }, {
                            id: 2,
                            title: 'task 3',
                            priority: 2,
                            finished: false,
                            deadline: 'today',
                            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
                        }
                    ];
                }
                onTaskAdded($event) {
                    console.log('Event sent to app: ');
                    console.log($event);
                    var newTasks = [$event];
                    this.tasks = this.tasks.concat(newTasks);
                    this.taskListTitle = 'Todo list edited';
                }
            };
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'nn-app',
                    templateUrl: 'app/app.component.html',
                    directives: [task_list_component_1.TaskListComponent, edit_task_component_1.EditTaskComponent],
                    providers: [task_service_1.TaskService, http_1.HTTP_PROVIDERS]
                }), 
                __metadata('design:paramtypes', [])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map