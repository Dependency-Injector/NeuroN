System.register(['@angular/core', './task', '@angular/http', 'rxjs/Observable', 'rxjs/Rx', './../utilities/apiHelper.service'], function(exports_1, context_1) {
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
    var core_1, task_1, http_1, Observable_1, Rx_1, apiHelper_service_1;
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
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (apiHelper_service_1_1) {
                apiHelper_service_1 = apiHelper_service_1_1;
            }],
        execute: function() {
            let TaskService = class TaskService {
                constructor(http, apiHelper) {
                    this.http = http;
                    this.apiHelper = apiHelper;
                    this.azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/tasks';
                    this.localApiUrl = 'http://localhost:2243/api/tasks';
                    this.tasks = [];
                    this.tasks = [];
                    this._todos = new Rx_1.BehaviorSubject(new Array());
                    this.jsonHeaders = new http_1.RequestOptions({ headers: apiHelper.getJsonHeaders() });
                    this.loadInitialData();
                }
                get todos() {
                    return this._todos.asObservable();
                }
                translateTask(task) {
                    return new task_1.Task(task.id, task.title, task.deadline, task.isFinished);
                }
                loadInitialData() {
                    console.log('loadInitialData');
                    //ttt
                    this.http.get(this.localApiUrl)
                        .map((response) => {
                        let resp = response.json();
                        let todos = resp.map(this.translateTask);
                        //let todos = (<Object[]>response.json()).map((task: any) => new Task(task.id, task.title, task.deadline, task.isFinished));
                        return todos;
                    })
                        .catch(this.handleError)
                        .subscribe(res => {
                        this.tasks = res;
                        this._todos.next(res);
                    });
                }
                addTodo(newTodo) {
                    let obs = this.http.post(this.localApiUrl, JSON.stringify(newTodo), this.jsonHeaders).share();
                    obs.subscribe(res => {
                        let t = res.json();
                        let taskObject = new task_1.Task(t.id, t.title, t.deadline, t.isFinished);
                        var temp = this._todos.getValue();
                        temp.push(taskObject);
                        this._todos.next(temp);
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
                    let obs = this.http.delete(this.localApiUrl + "/" + task.id, this.jsonHeaders).share();
                    obs.subscribe(res => {
                        /*let t = res.json();
                        let taskObject = new Task(t.id, t.title, t.deadline, t.isFinished);
        */
                        var temp = this._todos.getValue();
                        var index = temp.findIndex((tt) => tt.id === task.id, 0);
                        if (index > -1) {
                            temp.splice(index, 1);
                            this._todos.next(temp);
                        }
                    }, err => console.log('ellol. xd'));
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
                            .subscribe(task => {
                            let createdTask = new task_1.Task(task.id, task.title, task.deadline, task.isFinished);
                            this.tasks.push(createdTask);
                            this._todos.next(this.tasks);
                            //this.subject.next(this.tasks);
                        });
                    }
                    else {
                        this.http.put(this.localApiUrl + '/' + task.id, JSON.stringify(task), this.jsonHeaders)
                            .map(responseData => {
                            return responseData.json();
                        })
                            .catch(this.handleError)
                            .subscribe(data => {
                            let updatedTaskIndex = this.tasks.findIndex(t => t.id == data.id);
                            if (updatedTaskIndex) {
                                this.tasks[updatedTaskIndex] = data;
                                this._todos.next(this.tasks);
                            }
                        });
                    }
                }
                finishTask(taskId) {
                    this.http.get(this.localApiUrl + '/FinishTask');
                }
                /*getTasks(): Observable<Task[]> {
                    return this.subject.asObservable();
                }*/
                getTask(id) {
                    return this.tasks.find(t => t.id == id);
                }
                obtainTasksFromApi() {
                    console.log('obtainTasksFromApi');
                    let headers = new http_1.Headers({
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
                        .map((tasks) => {
                        let result = [];
                        if (tasks) {
                            tasks.forEach((task) => {
                                result.push(new task_1.Task(task.id, task.title, task.deadline, task.isFinished));
                            });
                            return result;
                        }
                    }).subscribe(res => {
                        //this.tasks = res;
                        //this.subject.next(this.tasks);
                    });
                }
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
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http, apiHelper_service_1.ApiHelper])
            ], TaskService);
            exports_1("TaskService", TaskService);
        }
    }
});
//# sourceMappingURL=task.service.js.map