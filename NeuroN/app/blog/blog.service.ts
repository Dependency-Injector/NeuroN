import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBlogEntry, BlogEntry } from './blog-entry';

//import 'rxjs/add/'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
//import { IBlogEntry, BlogEntry } from './blog-entry';
import { ApiHelper } from './../utilities/apiHelper.service';



@Injectable()

export class BlogService {
    private azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/blog';
    private localApiUrl = 'http://localhost:2243/api/blog';

    private stream: BehaviorSubject<Array<IBlogEntry>>;
    private tasks: Array<IBlogEntry> = [];
    
    constructor(private http: Http) {
        this.stream = new BehaviorSubject(new Array<IBlogEntry>());
    }

    getBlogEntries(): Observable<BlogEntry[]> {
        return this.http.get(this.localApiUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    removeEntry(id: number): Observable<BlogEntry[]> {
        return this.http.delete(`${this.localApiUrl}/${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    get entries() {
        return this.stream.asObservable();
    }

    /*translateTask(task: any): Task {
        return new Task(task.id, task.title, task.deadline, task.isFinished);
    }*/

    loadInitialData() {
        /*this.http.get(this.localApiUrl)
            .map((response: Response) => {
                let resp = response.json();
                let todos = resp.map(this.translateTask);
                //let todos = (<Object[]>response.json()).map((task: any) => new Task(task.id, task.title, task.deadline, task.isFinished));
                return todos;
            })
            .catch(this.handleError)
            .subscribe(res => {
                this.tasks = res;
                    this.stream.next(res);
                }
            );*/
    }

/*
    addTodo(newTodo: ITask): Observable<any> {
        let obs = this.http.post(this.localApiUrl, JSON.stringify(newTodo), this.jsonHeaders).share();

        obs.subscribe(
            res => {
                let t = res.json();
                let taskObject = new Task(t.id, t.title, t.deadline, t.isFinished);

                var temp = this.stream.getValue();
                temp.push(taskObject);
                this.stream.next(temp);
            }
        );

        return obs;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    createNewTask(title: string, deadline: string): ITask {
        return new Task(null, title, deadline, false);
    }

    createNewEmptyTask(): ITask {
        return this.createNewTask('', new Date().toDateString());
    }

    removeTask(task: ITask): Observable<any> {
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
                .subscribe(task => {
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
                .subscribe(data => {
                    let updatedTaskIndex = this.tasks.findIndex(t => t.id == data.id);

                    if (updatedTaskIndex != null) {
                        this.tasks[updatedTaskIndex] = data;
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
                let finishedTaskIndex = this.tasks.findIndex(t => t.id == data.id);

                if (finishedTaskIndex != null) {
                    this.tasks[finishedTaskIndex] = data;
                    this.stream.next(this.tasks);
                }
            });
    }


    getTask(id: number): ITask {
        return this.tasks.find(t => t.id == id);
    }*/
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
/*
    private handleError(error: any): any {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead

        //console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }*/
}