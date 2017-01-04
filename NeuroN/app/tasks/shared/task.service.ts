import { Injectable } from '@angular/core';
import {  Task, ITask } from './task';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
import { ApiHelper } from './../../utilities/apiHelper.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import Rx from 'rxjs/Rx';

@Injectable()

export class TaskService {
    private azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/tasks';
    private localApiUrl = 'http://localhost:2243/api/tasks';

    private stream: BehaviorSubject<Array<Task>>;
    private tasks: Array<Task> = [];
    private jsonHeaders: RequestOptions;

    get $tasks() {
        return this.stream.asObservable();
    }

    constructor(private http: Http, private apiHelper: ApiHelper) {
        this.tasks = [];
        this.stream = new BehaviorSubject(new Array<Task>());
       
        this.jsonHeaders = new RequestOptions({ headers: apiHelper.getJsonHeaders() });
        this.loadInitialData();
    }
    
    loadInitialData(): void {
        this.http.get(this.localApiUrl)
            .map(response => response.json())
            .map((tasks: Array<ITask>) => {
                let result: Array<Task> = [];
                tasks.forEach(task => {
                    result.push(this.translateTask(task));
                });

                //result = result.filter(task => task.isFinished === false);
                return result;
            })
            .subscribe((tasksArray: Array<Task>) => {
                this.tasks = tasksArray;
                this.stream.next(tasksArray);
            }, (error) => {
                console.log("Error: ");
                console.log(error);
            });
    }

    private translateTask(task: any): Task {
        return new Task(task.id, task.title, task.deadline, task.isFinished);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    createNewTask(title: string, deadline: string): Task {
        return new Task(null, title, deadline, false);
    }

    createNewEmptyTask(): Task {
        return this.createNewTask('', new Date().toDateString());
    }

    removeTask(task: Task): Observable<Response> {
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

    saveTask(task: ITask): void {
        // New task - save by POST
        if (task.id == null) {
            this.http.post(this.localApiUrl, JSON.stringify(task), this.jsonHeaders)
                .map((response: Response) => {
                    return response.json();
                })
                .catch(this.handleError)
                .subscribe((task: ITask) => {
                    let createdTask = new Task(task.id, task.title, task.deadline, task.isFinished);
                    this.tasks.push(createdTask);
                    this.stream.next(this.tasks);
                });
        }
        // Existing task - update by PUT
        else {
            this.http.put(this.localApiUrl + '/' + task.id, JSON.stringify(task), this.jsonHeaders)
                .map(responseData => {
                    return responseData.json();
                })
                //.catch(this.handleError)
                .subscribe((data: Task) => {
                    let updatedTaskIndex = this.tasks.findIndex(t => t.id === data.id);

                    if (updatedTaskIndex != null) {
                        this.tasks[updatedTaskIndex] = new Task(data.id, data.title, data.deadline, data.isFinished);
                        this.stream.next(this.tasks);
                    }
                });
        }
    }

    finishTask(taskId: number): void {
        this.http.put(`${this.localApiUrl}/FinishTask/${taskId}`, { headers: this.jsonHeaders.headers })
            .map(response => {
                return response.json();
            }).subscribe(data => {
                let finishedTaskIndex = this.tasks.findIndex(t => t.id === data.id);

                if (finishedTaskIndex != null) {
                    this.tasks[finishedTaskIndex] = new Task(data.id, data.title, data.deadline, data.isFinished);;
                    this.stream.next(this.tasks);
                }
            });
    }
    
    getTask(id: number): Task {
        return this.tasks.find(t => t.id == id);
    }

    private handleError(error: any): any {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead

        //console.log(error);
        return Observable.throw(error.json().error || 'Server error wqeqwe');
    }
}