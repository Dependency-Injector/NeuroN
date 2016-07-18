System.register(['angular2/core', './task', 'angular2/http', 'rxjs/Observable', 'rxjs/Subject'], function(exports_1, context_1) {
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
    var core_1, task_1, http_1, Observable_1, Subject_1;
    var TaskService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (task_1_1) {
                task_1 = task_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            let TaskService = class TaskService {
                constructor(http) {
                    this.http = http;
                    this.azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/tasks';
                    this.tasksApiUrl = 'api/tasks/tasks.json';
                    this.tasks = [];
                    this.subject = new Subject_1.Subject();
                    this.obtainTasksFromJson();
                }
                addTask(newTask) {
                    this.http.post(this.azureTasksApiUrl, JSON.stringify(newTask))
                        .map((responseData) => {
                        console.log("Returned data: ");
                        console.log(responseData);
                    });
                    this.tasks.push(newTask);
                    this.subject.next(this.tasks);
                }
                getTasks() {
                    return this.subject.asObservable();
                }
                getTask(id) {
                    return this.tasks[0];
                }
                obtainTasksFromJson() {
                    // Obtains tasks from json file
                    // Maps them to array of Task
                    // Subscribes to itself (change this in future) and save obtained tasks
                    // Notify about task collection change
                    this.http.get(this.azureTasksApiUrl)
                        .map((responseData) => {
                        return responseData.json();
                    })
                        .map((tasks) => {
                        let result = [];
                        if (tasks) {
                            tasks.forEach((task) => {
                                result.push(new task_1.Task(task.id, task.title, 3, '', false, ''));
                            });
                            return result;
                        }
                    }).subscribe(res => {
                        this.tasks = res;
                        this.subject.next(this.tasks);
                    });
                }
                handleError(error) {
                    console.log(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                }
            };
            TaskService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], TaskService);
            exports_1("TaskService", TaskService);
        }
    }
});
//# sourceMappingURL=task.service.js.map