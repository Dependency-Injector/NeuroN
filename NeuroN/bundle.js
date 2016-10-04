var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("shared/notification/shared/notification", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Notification;
    return {
        setters:[],
        execute: function() {
            Notification = class Notification {
                constructor(obj) {
                    this.id = obj && obj.id || 0;
                    this.content = obj && obj.content || '';
                    this.type = obj && obj.type || '';
                    this.date = obj && obj.date || new Date();
                }
            };
            exports_1("Notification", Notification);
        }
    }
});
System.register("utilities/apiHelper.service", ['@angular/core', '@angular/http'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, http_1;
    var ApiHelper;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            ApiHelper = class ApiHelper {
                constructor() {
                    this.azureApiUrl = 'http://apineuro.azurewebsites.net/api/';
                    this.localApiUrl = 'http://localhost:2243/api/';
                    this.useLocalApi = true;
                    this.jsonHeaders = this.createDefaultJsonHeaders();
                }
                createDefaultJsonHeaders() {
                    let headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Accept', 'application/json');
                    return headers;
                }
                getApiUrl() {
                    if (this.useLocalApi)
                        return this.localApiUrl;
                    else
                        return this.azureApiUrl;
                }
                getJsonHeaders() {
                    return this.jsonHeaders;
                }
            };
            ApiHelper = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [])
            ], ApiHelper);
            exports_2("ApiHelper", ApiHelper);
        }
    }
});
System.register("shared/notification/shared/notification.service", ['@angular/core', '@angular/http', 'rxjs/add/operator/map', 'rxjs/add/operator/catch', 'rxjs/Rx', "utilities/apiHelper.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, http_2, Rx_1, apiHelper_service_1;
    var NotificationService;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
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
            NotificationService = class NotificationService {
                constructor(http, apiHelper) {
                    this.http = http;
                    this.apiHelper = apiHelper;
                    this.azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/notifications';
                    this.localApiUrl = 'http://localhost:2243/api/notifications';
                    this.stream = new Rx_1.BehaviorSubject(new Array());
                    this._notifications = new Array();
                    this.requestOptions = new http_2.RequestOptions({ headers: apiHelper.getJsonHeaders() });
                    this.loadAll();
                }
                get notifications() {
                    return this.stream.asObservable();
                }
                loadAll() {
                    this.http.get(this.localApiUrl)
                        .map((response) => response.json())
                        .subscribe(data => {
                        this._notifications = data;
                        this.stream.next(this._notifications);
                    }, error => {
                        console.log('Could not load blog notifications. Error: ');
                        console.log(error);
                    });
                }
                addNotification(post) {
                    this.http.post(this.localApiUrl, JSON.stringify(post), this.requestOptions)
                        .map((response) => response.json())
                        .subscribe(data => {
                        this._notifications.push(data);
                        this.stream.next(this._notifications);
                    }, error => console.log('Could not create notification.'));
                }
                updateNotification(post) {
                    this.http.put(`${this.localApiUrl}/${post.id}`, JSON.stringify(post), this.requestOptions)
                        .map((response) => response.json())
                        .subscribe(data => {
                        this._notifications.forEach((post, i) => {
                            if (post.id === data.id) {
                                this._notifications[i] = data;
                            }
                        });
                        this.stream.next(this._notifications);
                    }, error => console.log('Could not update notification.'));
                }
                removeNotification(id) {
                    this.http.delete(`${this.localApiUrl}/${id}`).subscribe(response => {
                        this._notifications.forEach((post, i) => {
                            if (post.id === id) {
                                this._notifications.splice(i, 1);
                            }
                        });
                        this.stream.next(this._notifications);
                    }, error => console.log('Could not remove notification.'));
                }
            };
            NotificationService = __decorate([
                core_2.Injectable(), 
                __metadata('design:paramtypes', [http_2.Http, apiHelper_service_1.ApiHelper])
            ], NotificationService);
            exports_3("NotificationService", NotificationService);
        }
    }
});
System.register("shared/notification/notification.component", ['@angular/core', "shared/notification/shared/notification.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, notification_service_1;
    var NotificationComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (notification_service_1_1) {
                notification_service_1 = notification_service_1_1;
            }],
        execute: function() {
            NotificationComponent = class NotificationComponent {
                constructor(notificationService) {
                    this.notificationService = notificationService;
                    this.notifications = new Array();
                }
                ngOnInit() {
                    this.notificationService.notifications.subscribe(notifications => this.notifications = notifications, err => console.log(err));
                }
            };
            NotificationComponent = __decorate([
                core_3.Component({
                    selector: 'nn-notification',
                    templateUrl: 'app/shared/notification/notification.component.html'
                }), 
                __metadata('design:paramtypes', [notification_service_1.NotificationService])
            ], NotificationComponent);
            exports_4("NotificationComponent", NotificationComponent);
        }
    }
});
System.register("app.component", ['@angular/core', '@angular/router'], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_4, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = class AppComponent {
                constructor(router) {
                    this.router = router;
                    this.pageTitle = 'NeuroN FrameworK';
                    this.taskListTitle = 'Todo list';
                }
                onRouteSelected(route) {
                    console.log(route);
                    this.router.navigate([route]);
                }
            };
            AppComponent = __decorate([
                core_4.Component({
                    selector: 'nn-app',
                    templateUrl: 'app/app.component.html'
                }), 
                __metadata('design:paramtypes', [router_1.Router])
            ], AppComponent);
            exports_5("AppComponent", AppComponent);
        }
    }
});
System.register("tasks/shared/task", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Task;
    return {
        setters:[],
        execute: function() {
            Task = class Task {
                constructor(id, title, deadline, isFinished) {
                    this.id = id;
                    this.title = title;
                    this.deadline = deadline;
                    this.isFinished = isFinished;
                }
                calculateRemainingDays(currentDay) {
                    return 4;
                }
            };
            exports_6("Task", Task);
        }
    }
});
System.register("tasks/shared/task-filter.pipe", ['@angular/core'], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5;
    var TaskFilterPipe;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            }],
        execute: function() {
            TaskFilterPipe = class TaskFilterPipe {
                transform(value, args) {
                    let filter = args[0] ? args[0].toLocaleLowerCase() : null;
                    return filter ? value.filter((task) => task.title.toLocaleLowerCase().indexOf(filter) != -1) : value;
                }
            };
            TaskFilterPipe = __decorate([
                core_5.Pipe({
                    name: 'taskFilter'
                }), 
                __metadata('design:paramtypes', [])
            ], TaskFilterPipe);
            exports_7("TaskFilterPipe", TaskFilterPipe);
        }
    }
});
System.register("shared/star/star.component", ['@angular/core'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6;
    var StarComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            }],
        execute: function() {
            StarComponent = class StarComponent {
                constructor() {
                    this.priorityClicked = new core_6.EventEmitter();
                }
                ngOnChanges() {
                    this.starWidth = this.priority * 86 / 5;
                }
                onClick() {
                    this.priorityClicked.emit('The priority ' + this.priority + ' clicked');
                }
            };
            __decorate([
                core_6.Input(), 
                __metadata('design:type', Number)
            ], StarComponent.prototype, "priority", void 0);
            __decorate([
                core_6.Output(), 
                __metadata('design:type', core_6.EventEmitter)
            ], StarComponent.prototype, "priorityClicked", void 0);
            StarComponent = __decorate([
                core_6.Component({
                    selector: 'nn-star',
                    templateUrl: 'app/shared/star/star.component.html',
                    styleUrls: ['app/shared/star/star.component.css']
                }), 
                __metadata('design:paramtypes', [])
            ], StarComponent);
            exports_8("StarComponent", StarComponent);
        }
    }
});
System.register("tasks/shared/task.service", ['@angular/core', "tasks/shared/task", '@angular/http', 'rxjs/Observable', 'rxjs/Rx', "utilities/apiHelper.service", 'rxjs/add/operator/map'], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_7, task_1, http_3, Observable_1, Rx_2, apiHelper_service_2;
    var TaskService;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (task_1_1) {
                task_1 = task_1_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Rx_2_1) {
                Rx_2 = Rx_2_1;
            },
            function (apiHelper_service_2_1) {
                apiHelper_service_2 = apiHelper_service_2_1;
            },
            function (_3) {}],
        execute: function() {
            TaskService = class TaskService {
                constructor(http, apiHelper) {
                    this.http = http;
                    this.apiHelper = apiHelper;
                    this.azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/tasks';
                    this.localApiUrl = 'http://localhost:2243/api/tasks';
                    this.tasks = [];
                    this.tasks = [];
                    this.stream = new Rx_2.BehaviorSubject(new Array());
                    this.jsonHeaders = new http_3.RequestOptions({ headers: apiHelper.getJsonHeaders() });
                    this.loadInitialData();
                }
                get todos() {
                    return this.stream.asObservable();
                }
                translateTask(task) {
                    return new task_1.Task(task.id, task.title, task.deadline, task.isFinished);
                }
                loadInitialData() {
                    this.http.get(this.localApiUrl)
                        .map((response) => {
                        let resp = response.json();
                        let todos = resp.map(this.translateTask);
                        //let todos = (<Object[]>response.json()).map((task: any) => new Task(task.id, task.title, task.deadline, task.isFinished));
                        return todos;
                    })
                        .catch(this.handleError)
                        .subscribe((res) => {
                        this.tasks = res;
                        this.stream.next(res);
                    });
                }
                addTodo(newTodo) {
                    let obs = this.http.post(this.localApiUrl, JSON.stringify(newTodo), this.jsonHeaders).share();
                    obs.subscribe(res => {
                        let t = res.json();
                        let taskObject = new task_1.Task(t.id, t.title, t.deadline, t.isFinished);
                        var temp = this.stream.getValue();
                        temp.push(taskObject);
                        this.stream.next(temp);
                    });
                    return obs;
                }
                extractData(res) {
                    let body = res.json();
                    return body.data || {};
                }
                createNewTask(title, deadline) {
                    return new task_1.Task(null, title, deadline, false);
                }
                createNewEmptyTask() {
                    return this.createNewTask('', new Date().toDateString());
                }
                removeTask(task) {
                    let obs = this.http.delete(this.localApiUrl + "/" + task.id);
                    obs.subscribe((res) => {
                        var index = this.tasks.findIndex((tt) => tt.id === task.id, 0);
                        if (index > -1) {
                            this.tasks.splice(index, 1);
                            this.stream.next(this.tasks);
                        }
                    }, err => {
                        console.log('error when removing task');
                        console.log(err);
                    });
                    return obs;
                }
                saveTask(task) {
                    // New task - save by POST
                    if (task.id == null) {
                        this.http.post(this.localApiUrl, JSON.stringify(task), this.jsonHeaders)
                            .map((response) => {
                            return response.json();
                        })
                            .catch(this.handleError)
                            .subscribe((task) => {
                            let createdTask = new task_1.Task(task.id, task.title, task.deadline, task.isFinished);
                            this.tasks.push(createdTask);
                            this.stream.next(this.tasks);
                        });
                    }
                    else {
                        this.http.put(this.localApiUrl + '/' + task.id, JSON.stringify(task), this.jsonHeaders)
                            .map(responseData => {
                            return responseData.json();
                        })
                            .subscribe(data => {
                            let updatedTaskIndex = this.tasks.findIndex(t => t.id == data.id);
                            if (updatedTaskIndex != null) {
                                this.tasks[updatedTaskIndex] = data;
                                this.stream.next(this.tasks);
                            }
                        });
                    }
                }
                finishTask(taskId) {
                    this.http.put(`${this.localApiUrl}/FinishTask/${taskId}`, { headers: this.jsonHeaders.headers })
                        .map(response => {
                        return response.json();
                    }).subscribe(data => {
                        let finishedTaskIndex = this.tasks.findIndex(t => t.id == data.id);
                        if (finishedTaskIndex != null) {
                            this.tasks[finishedTaskIndex] = data;
                            this.stream.next(this.tasks);
                        }
                    });
                }
                getTask(id) {
                    return this.tasks.find(t => t.id == id);
                }
                /*
                private obtainTasksFromApi(): void {
            
                    console.log('obtainTasksFromApi');
            
                    let headers = new Headers({
                        'Content-Type': 'application/json'
                    });
            
                    // Obtains tasks from json file
                    // Maps them to array of Task
                    // Subscribes to itself (change this in future) and save obtained tasks
                    // Notify about task collection change
                    this.http.get(this.azureTasksApiUrl)
                        .map((responseData) => {
                            return responseData.json();
                        })
                        .map((tasks: Array<any>) => {
                            let result: Array<ITask> = [];
                            if (tasks) {
                                tasks.forEach((task) => {
                                    result.push(new Task(task.id, task.title, task.deadline, task.isFinished));
                                });
                                return result;
                            }
                        }).subscribe(res => {
                            //this.tasks = res;
                            //this.subject.next(this.tasks);
                        });
                }
            */
                handleError(error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    let errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                    console.error(errMsg); // log to console instead
                    //console.log(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                }
            };
            TaskService = __decorate([
                core_7.Injectable(), 
                __metadata('design:paramtypes', [http_3.Http, apiHelper_service_2.ApiHelper])
            ], TaskService);
            exports_9("TaskService", TaskService);
        }
    }
});
System.register("tasks/task-list/task-list.component", ['@angular/core', "tasks/shared/task.service"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_8, task_service_1;
    var TaskListComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            }],
        execute: function() {
            TaskListComponent = class TaskListComponent {
                constructor(taskService) {
                    this.taskService = taskService;
                    this.editTaskClicked = new core_8.EventEmitter();
                    this.imageHeight = 50;
                    this.imageWidth = 40;
                    this.showImage = false;
                    this.listFilter = 'task';
                    this.pageTitle = 'Todo';
                }
                toggleImage() {
                    this.showImage = !this.showImage;
                }
                editTask(taskId) {
                    this.editTaskClicked.emit(taskId);
                }
                finishTask(taskId) {
                    this.taskService.finishTask(taskId);
                }
                setDate(date) {
                    return new Date(date);
                }
                ngOnInit() {
                    this.taskService.todos.subscribe((tasks) => {
                        this.tasks = tasks;
                        console.log('task list has new list');
                    });
                }
                ngOnChanges(changes) {
                    if (changes.tasks)
                        this.tasks = changes.tasks.currentValue;
                }
                onPriorityClicked(message) {
                    //this.pageTitle = "Product list " + message;
                }
            };
            __decorate([
                core_8.Output(), 
                __metadata('design:type', core_8.EventEmitter)
            ], TaskListComponent.prototype, "editTaskClicked", void 0);
            TaskListComponent = __decorate([
                core_8.Component({
                    selector: 'nn-task-list',
                    templateUrl: 'app/tasks/task-list/task-list.component.html',
                    styleUrls: ['app/tasks/task-list/task-list.component.css']
                }), 
                __metadata('design:paramtypes', [task_service_1.TaskService])
            ], TaskListComponent);
            exports_10("TaskListComponent", TaskListComponent);
        }
    }
});
System.register("tasks/edit-task/edit-task.component", ['@angular/core', "tasks/shared/task.service"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_9, task_service_2;
    var EditTaskComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (task_service_2_1) {
                task_service_2 = task_service_2_1;
            }],
        execute: function() {
            EditTaskComponent = class EditTaskComponent {
                constructor(taskService) {
                    this.taskService = taskService;
                    this.isInEditMode = false;
                }
                ngOnChanges(changes) {
                    if (changes.taskId) {
                        this.taskId = changes.taskId.currentValue;
                        if (this.taskId == null) {
                            this.task = null;
                            this.isInEditMode = false;
                        }
                        else {
                            this.task = this.taskService.getTask(this.taskId);
                            this.title = this.task.title;
                            this.deadline = this.task.deadline;
                            this.isInEditMode = true;
                        }
                    }
                }
                createNew() {
                    let newTask = this.taskService.createNewTask(this.title, this.deadline);
                    this.taskService.saveTask(newTask);
                    this.clearUi();
                }
                remove() {
                    this.taskService.removeTask(this.task);
                    this.clearUi();
                }
                saveChanges() {
                    this.task.title = this.title;
                    this.task.deadline = this.deadline;
                    this.taskService.saveTask(this.task);
                    this.clearUi();
                }
                discardChanges() {
                    this.clearUi();
                }
                clearUi() {
                    this.title = '';
                    this.deadline = new Date();
                    this.isInEditMode = false;
                }
            };
            __decorate([
                core_9.Input(), 
                __metadata('design:type', Number)
            ], EditTaskComponent.prototype, "taskId", void 0);
            EditTaskComponent = __decorate([
                core_9.Component({
                    selector: 'nn-edit-task',
                    templateUrl: 'app/tasks/edit-task/edit-task.component.html',
                    styleUrls: ['app/tasks/edit-task/edit-task.component.css']
                }), 
                __metadata('design:paramtypes', [task_service_2.TaskService])
            ], EditTaskComponent);
            exports_11("EditTaskComponent", EditTaskComponent);
        }
    }
});
System.register("tasks/todo-page.component", ['@angular/core', 'rxjs/Rx'], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_10;
    var TodoPageComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (_4) {}],
        execute: function() {
            TodoPageComponent = class TodoPageComponent {
                constructor() {
                    this.pageTitle = 'Todo page';
                    this.editedTaskId = null;
                }
                onEditTask($event) {
                    this.editedTaskId = $event;
                }
            };
            TodoPageComponent = __decorate([
                core_10.Component({
                    templateUrl: 'app/tasks/todo-page.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], TodoPageComponent);
            exports_12("TodoPageComponent", TodoPageComponent);
        }
    }
});
System.register("tasks/task-details/task-details.component", ['@angular/core', '@angular/router'], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_11, router_2;
    var TaskDetailsComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            }],
        execute: function() {
            TaskDetailsComponent = class TaskDetailsComponent {
                constructor(route) {
                    this.route = route;
                    this.pageTitle = 'Task details';
                    //let link = ['/detail', hero.id];
                    //this.router.navigate(link);
                    //let id = +this._routeParams.get('id');
                    //this.pageTitle += `: ${id}`;
                }
                onBack() {
                    //this._router.navigate(['Tasks']);
                }
            };
            TaskDetailsComponent = __decorate([
                core_11.Component({
                    templateUrl: 'app/tasks/task-details/task-details.component.html'
                }), 
                __metadata('design:paramtypes', [router_2.ActivatedRoute])
            ], TaskDetailsComponent);
            exports_13("TaskDetailsComponent", TaskDetailsComponent);
        }
    }
});
System.register("avatar/shared/avatar", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Avatar;
    return {
        setters:[],
        execute: function() {
            Avatar = class Avatar {
                constructor(obj) {
                    this.id = obj && obj.id || 0;
                    this.name = obj && obj.name || '';
                    this.xp = obj && obj.xp || 0;
                    this.level = obj && obj.level || 0;
                }
            };
            exports_14("Avatar", Avatar);
        }
    }
});
System.register("avatar/shared/avatar.service", ['@angular/core', '@angular/http', "avatar/shared/avatar", 'rxjs/add/operator/map', 'rxjs/add/operator/catch', 'rxjs/Rx', "utilities/apiHelper.service"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_12, http_4, avatar_1, Rx_3, apiHelper_service_3;
    var AvatarService;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (avatar_1_1) {
                avatar_1 = avatar_1_1;
            },
            function (_5) {},
            function (_6) {},
            function (Rx_3_1) {
                Rx_3 = Rx_3_1;
            },
            function (apiHelper_service_3_1) {
                apiHelper_service_3 = apiHelper_service_3_1;
            }],
        execute: function() {
            AvatarService = class AvatarService {
                constructor(http, apiHelper) {
                    this.http = http;
                    this.apiHelper = apiHelper;
                    this.azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/avatar';
                    this.localApiUrl = 'http://localhost:2243/api/avatar';
                    this.stream = new Rx_3.BehaviorSubject(new avatar_1.Avatar());
                    this._avatar = new avatar_1.Avatar();
                    this.requestOptions = new http_4.RequestOptions({ headers: apiHelper.getJsonHeaders() });
                    this.loadAvatar();
                }
                get avatar() {
                    return this.stream.asObservable();
                }
                loadAvatar() {
                    this.http.get(this.localApiUrl)
                        .map((response) => response.json())
                        .subscribe(data => {
                        this._avatar = data[0];
                        this.stream.next(this._avatar);
                    }, error => {
                        console.log('Could not load blog posts. Error: ');
                        console.log(error);
                    });
                }
            };
            AvatarService = __decorate([
                core_12.Injectable(), 
                __metadata('design:paramtypes', [http_4.Http, apiHelper_service_3.ApiHelper])
            ], AvatarService);
            exports_15("AvatarService", AvatarService);
        }
    }
});
System.register("avatar/avatar.component", ['@angular/core', "avatar/shared/avatar.service"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_13, avatar_service_1;
    var AvatarComponent;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (avatar_service_1_1) {
                avatar_service_1 = avatar_service_1_1;
            }],
        execute: function() {
            AvatarComponent = class AvatarComponent {
                constructor(avatarService) {
                    this.avatarService = avatarService;
                    this.pageTitle = 'avatar page';
                    this.pageTitle = this.pageTitle + " . Route params: "; // + this.routeParams.get('id');
                }
                ngOnInit() {
                    this.avatarService.avatar.subscribe(avatar => this.avatar = avatar, err => console.log(err));
                }
            };
            AvatarComponent = __decorate([
                core_13.Component({
                    templateUrl: 'app/avatar/avatar.component.html'
                }), 
                __metadata('design:paramtypes', [avatar_service_1.AvatarService])
            ], AvatarComponent);
            exports_16("AvatarComponent", AvatarComponent);
        }
    }
});
System.register("blog/shared/blog-entry", [], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var BlogEntry;
    return {
        setters:[],
        execute: function() {
            BlogEntry = class BlogEntry {
                constructor(obj) {
                    this.id = obj && obj.id || 0;
                    this.title = obj && obj.title || '';
                    this.content = obj && obj.description || '';
                    this.created = obj && obj.created || new Date();
                }
            };
            exports_17("BlogEntry", BlogEntry);
        }
    }
});
System.register("blog/shared/blog.service", ['@angular/core', '@angular/http', 'rxjs/add/operator/map', 'rxjs/add/operator/catch', 'rxjs/Rx', "utilities/apiHelper.service"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_14, http_5, Rx_4, apiHelper_service_4;
    var BlogService;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (http_5_1) {
                http_5 = http_5_1;
            },
            function (_7) {},
            function (_8) {},
            function (Rx_4_1) {
                Rx_4 = Rx_4_1;
            },
            function (apiHelper_service_4_1) {
                apiHelper_service_4 = apiHelper_service_4_1;
            }],
        execute: function() {
            BlogService = class BlogService {
                constructor(http, apiHelper) {
                    this.http = http;
                    this.apiHelper = apiHelper;
                    this.azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/post';
                    this.localApiUrl = 'http://localhost:2243/api/post';
                    this.stream = new Rx_4.BehaviorSubject(new Array());
                    this._posts = new Array();
                    this.requestOptions = new http_5.RequestOptions({ headers: apiHelper.getJsonHeaders() });
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
                core_14.Injectable(), 
                __metadata('design:paramtypes', [http_5.Http, apiHelper_service_4.ApiHelper])
            ], BlogService);
            exports_18("BlogService", BlogService);
        }
    }
});
System.register("blog/blog-entry-list/blog-entry-list.component", ['@angular/core', "blog/shared/blog.service"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_15, blog_service_1;
    var BlogEntryListComponent;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (blog_service_1_1) {
                blog_service_1 = blog_service_1_1;
            }],
        execute: function() {
            BlogEntryListComponent = class BlogEntryListComponent {
                constructor(blogService) {
                    this.blogService = blogService;
                    this.editPostClicked = new core_15.EventEmitter();
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
                core_15.Output(), 
                __metadata('design:type', core_15.EventEmitter)
            ], BlogEntryListComponent.prototype, "editPostClicked", void 0);
            BlogEntryListComponent = __decorate([
                core_15.Component({
                    selector: 'nn-blog-entry-list',
                    templateUrl: 'app/blog/blog-entry-list/blog-entry-list.component.html',
                    styleUrls: ['app/blog/blog-entry-list/blog-entry-list.component.css']
                }), 
                __metadata('design:paramtypes', [blog_service_1.BlogService])
            ], BlogEntryListComponent);
            exports_19("BlogEntryListComponent", BlogEntryListComponent);
        }
    }
});
System.register("blog/blog.component", ['@angular/core', 'rxjs/Rx'], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_16;
    var BlogComponent;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
            },
            function (_9) {}],
        execute: function() {
            BlogComponent = class BlogComponent {
                constructor() {
                    this.pageTitle = 'News / updates';
                    this.editedPostId = null;
                }
                onEditPost($event) {
                    this.editedPostId = $event;
                }
            };
            BlogComponent = __decorate([
                core_16.Component({
                    templateUrl: 'app/blog/blog.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], BlogComponent);
            exports_20("BlogComponent", BlogComponent);
        }
    }
});
System.register("app.routing", ['@angular/router', "tasks/todo-page.component", "avatar/avatar.component", "blog/blog.component"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var router_3, todo_page_component_1, avatar_component_1, blog_component_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_3_1) {
                router_3 = router_3_1;
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
            exports_21("routing", routing = router_3.RouterModule.forRoot(appRoutes));
        }
    }
});
System.register("shared/menu/menu-item.component", ['@angular/core'], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_17;
    var MenuItemComponent;
    return {
        setters:[
            function (core_17_1) {
                core_17 = core_17_1;
            }],
        execute: function() {
            MenuItemComponent = class MenuItemComponent {
                constructor() {
                    this.menuItemSelected = new core_17.EventEmitter();
                }
                menuItemClicked() {
                    this.menuItemSelected.emit(this.route);
                }
            };
            __decorate([
                core_17.Input(), 
                __metadata('design:type', String)
            ], MenuItemComponent.prototype, "label", void 0);
            __decorate([
                core_17.Input(), 
                __metadata('design:type', String)
            ], MenuItemComponent.prototype, "icon", void 0);
            __decorate([
                core_17.Input(), 
                __metadata('design:type', String)
            ], MenuItemComponent.prototype, "route", void 0);
            __decorate([
                core_17.Output(), 
                __metadata('design:type', core_17.EventEmitter)
            ], MenuItemComponent.prototype, "menuItemSelected", void 0);
            MenuItemComponent = __decorate([
                core_17.Component({
                    selector: 'nn-menu-item',
                    templateUrl: 'app/shared/menu/menu-item.component.html',
                    styleUrls: ['app/shared/menu/menu-item.component.css'],
                    host: {
                        'class': 'nn-menu-item'
                    }
                }), 
                __metadata('design:paramtypes', [])
            ], MenuItemComponent);
            exports_22("MenuItemComponent", MenuItemComponent);
        }
    }
});
System.register("shared/menu/menu.component", ['@angular/core'], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_18;
    var MenuComponent;
    return {
        setters:[
            function (core_18_1) {
                core_18 = core_18_1;
            }],
        execute: function() {
            MenuComponent = class MenuComponent {
            };
            MenuComponent = __decorate([
                core_18.Component({
                    selector: 'nn-menu',
                    templateUrl: 'app/shared/menu/menu.component.html',
                    styleUrls: ['app/shared/menu/menu.component.css'],
                    host: {
                        'class': 'nn-menu-area'
                    }
                }), 
                __metadata('design:paramtypes', [])
            ], MenuComponent);
            exports_23("MenuComponent", MenuComponent);
        }
    }
});
System.register("blog/edit-blog-entry/edit-blog-entry.component", ['@angular/core', "blog/shared/blog.service", "blog/shared/blog-entry"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var core_19, blog_service_2, blog_entry_1;
    var EditBlogEntryComponent;
    return {
        setters:[
            function (core_19_1) {
                core_19 = core_19_1;
            },
            function (blog_service_2_1) {
                blog_service_2 = blog_service_2_1;
            },
            function (blog_entry_1_1) {
                blog_entry_1 = blog_entry_1_1;
            }],
        execute: function() {
            EditBlogEntryComponent = class EditBlogEntryComponent {
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
                core_19.Input(), 
                __metadata('design:type', Number)
            ], EditBlogEntryComponent.prototype, "postId", void 0);
            EditBlogEntryComponent = __decorate([
                core_19.Component({
                    selector: 'nn-edit-blog-entry',
                    templateUrl: 'app/blog/edit-blog-entry/edit-blog-entry.component.html'
                }), 
                __metadata('design:paramtypes', [blog_service_2.BlogService])
            ], EditBlogEntryComponent);
            exports_24("EditBlogEntryComponent", EditBlogEntryComponent);
        }
    }
});
System.register("app.module", ['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', 'ng2-bootstrap/ng2-bootstrap', "app.routing", "app.component", "shared/menu/menu.component", "shared/menu/menu-item.component", "tasks/todo-page.component", "tasks/edit-task/edit-task.component", "tasks/task-list/task-list.component", "blog/blog.component", "blog/blog-entry-list/blog-entry-list.component", "blog/edit-blog-entry/edit-blog-entry.component", "avatar/avatar.component", "shared/notification/notification.component", "tasks/shared/task.service", "blog/shared/blog.service", "avatar/shared/avatar.service", "shared/notification/shared/notification.service", "utilities/apiHelper.service"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var core_20, platform_browser_1, forms_1, http_6, ng2_bootstrap_1, app_routing_1, app_component_1, menu_component_1, menu_item_component_1, todo_page_component_2, edit_task_component_1, task_list_component_1, blog_component_2, blog_entry_list_component_1, edit_blog_entry_component_1, avatar_component_2, notification_component_1, task_service_3, blog_service_3, avatar_service_2, notification_service_2, apiHelper_service_5;
    var AppModule;
    return {
        setters:[
            function (core_20_1) {
                core_20 = core_20_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_6_1) {
                http_6 = http_6_1;
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
            function (todo_page_component_2_1) {
                todo_page_component_2 = todo_page_component_2_1;
            },
            function (edit_task_component_1_1) {
                edit_task_component_1 = edit_task_component_1_1;
            },
            function (task_list_component_1_1) {
                task_list_component_1 = task_list_component_1_1;
            },
            function (blog_component_2_1) {
                blog_component_2 = blog_component_2_1;
            },
            function (blog_entry_list_component_1_1) {
                blog_entry_list_component_1 = blog_entry_list_component_1_1;
            },
            function (edit_blog_entry_component_1_1) {
                edit_blog_entry_component_1 = edit_blog_entry_component_1_1;
            },
            function (avatar_component_2_1) {
                avatar_component_2 = avatar_component_2_1;
            },
            function (notification_component_1_1) {
                notification_component_1 = notification_component_1_1;
            },
            function (task_service_3_1) {
                task_service_3 = task_service_3_1;
            },
            function (blog_service_3_1) {
                blog_service_3 = blog_service_3_1;
            },
            function (avatar_service_2_1) {
                avatar_service_2 = avatar_service_2_1;
            },
            function (notification_service_2_1) {
                notification_service_2 = notification_service_2_1;
            },
            function (apiHelper_service_5_1) {
                apiHelper_service_5 = apiHelper_service_5_1;
            }],
        execute: function() {
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_20.NgModule({
                    imports: [
                        // Angular modules
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        http_6.HttpModule,
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
                        todo_page_component_2.TodoPageComponent,
                        edit_task_component_1.EditTaskComponent,
                        task_list_component_1.TaskListComponent,
                        // Blog page
                        blog_component_2.BlogComponent,
                        blog_entry_list_component_1.BlogEntryListComponent,
                        edit_blog_entry_component_1.EditBlogEntryComponent,
                        // Avatar page
                        avatar_component_2.AvatarComponent,
                        notification_component_1.NotificationComponent
                    ],
                    providers: [
                        task_service_3.TaskService,
                        blog_service_3.BlogService,
                        avatar_service_2.AvatarService,
                        notification_service_2.NotificationService,
                        apiHelper_service_5.ApiHelper
                    ],
                    bootstrap: [app_component_1.AppComponent]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_25("AppModule", AppModule);
        }
    }
});
//import { HTTP_PROVIDERS } from '@angular/http';
System.register("app.providers", [], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var APP_PROVIDERS;
    return {
        setters:[],
        execute: function() {
            //import { ItemsService } from './shared/utilities/items.service';
            //import { ConfigService } from './shared/utilities/config.service';
            //import { BlogService } from './blog/blog.service';
            exports_26("APP_PROVIDERS", APP_PROVIDERS = []);
        }
    }
});
System.register("home/welcome.component", ['@angular/core'], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var core_21;
    var WelcomeComponent;
    return {
        setters:[
            function (core_21_1) {
                core_21 = core_21_1;
            }],
        execute: function() {
            WelcomeComponent = class WelcomeComponent {
                constructor() {
                    this.pageTitle = "Welcome";
                }
            };
            WelcomeComponent = __decorate([
                core_21.Component({
                    templateUrl: 'app/home/welcome.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], WelcomeComponent);
            exports_27("WelcomeComponent", WelcomeComponent);
        }
    }
});
System.register("main", ['@angular/platform-browser-dynamic', "app.module"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var platform_browser_dynamic_1, app_module_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    }
});
System.register("rxjs-operators", ['rxjs/add/observable/throw', 'rxjs/add/operator/catch', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/map', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/toPromise'], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    return {
        setters:[
            function (_10) {},
            function (_11) {},
            function (_12) {},
            function (_13) {},
            function (_14) {},
            function (_15) {},
            function (_16) {}],
        execute: function() {
        }
    }
});
System.register("shared/utilities/config.service", ['@angular/core'], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var core_22;
    var ConfigService;
    return {
        setters:[
            function (core_22_1) {
                core_22 = core_22_1;
            }],
        execute: function() {
            ConfigService = class ConfigService {
                constructor() {
                    this.azureApiUrl = 'http://apineuro.azurewebsites.net/api/';
                    this.localApiUrl = 'http://localhost:2243/api/';
                    this.localApiUrl = 'http://localhost:2243/api/';
                    this.azureApiUrl = 'http://apineuro.azurewebsites.net/api/';
                    this.useLocalApi = true;
                }
                getApiUrl() {
                    if (this.useLocalApi)
                        return this.localApiUrl;
                    else
                        return this.azureApiUrl;
                }
                getApiHost() {
                    return this.getApiUrl().replace('api/', '');
                }
            };
            ConfigService = __decorate([
                core_22.Injectable(), 
                __metadata('design:paramtypes', [])
            ], ConfigService);
            exports_30("ConfigService", ConfigService);
        }
    }
});
System.register("shared/utilities/emitter.service", ['@angular/core'], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var core_23;
    var EmitterService;
    return {
        setters:[
            function (core_23_1) {
                core_23 = core_23_1;
            }],
        execute: function() {
            EmitterService = class EmitterService {
                // Set a new event in the store with a given ID as key
                static get(ID) {
                    if (!this.emitters[ID])
                        this.emitters[ID] = new core_23.EventEmitter();
                    return this.emitters[ID];
                }
            };
            // Event store
            EmitterService.emitters = {};
            EmitterService = __decorate([
                core_23.Injectable(), 
                __metadata('design:paramtypes', [])
            ], EmitterService);
            exports_31("EmitterService", EmitterService);
        }
    }
});
/*import { Injectable } from '@angular/core';
import { IPredicate } from '../interfaces';

import * as _ from 'lodash';

@Injectable()
export class ItemsService {
    constructor() {

    }

    removeItemFromArray<T>(array: Array<T>, item: any) {
        _.remove(array, function (current) {
            return JSON.stringify(current) === JSON.stringify(item);
        });
    }

    removeItems<T>(array: Array<T>, predicate: IPredicate<T>) {
        _.remove(array, predicate);
    }

    setItem<T>(array: Array<T>, predicate: IPredicate<T>, item: T) {
        let oldItem = _.find(array, predicate);
        if (oldItem) {
            let index = _.indexOf(array, oldItem);
            array.splice(index, 1, item);
        } else {
            array.push(item);
        }
    }

    addItemToStart<T>(array: Array<T>, item: any) {
        array.splice(0, 0, item);
    }

    getPropertyValues<T, R>(array: Array<T>, property: string): R {
        let result = _.map(array, property);
        return <R><any>result;
    }

    getSerialized<T>(arg: any): T {
        return <T>JSON.parse(JSON.stringify(arg));
    }
}*/ 
//# sourceMappingURL=bundle.js.map