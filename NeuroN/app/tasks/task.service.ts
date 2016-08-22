import { Injectable } from '@angular/core';
import { ITask, Task } from './task';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
import { ApiHelper } from './../utilities/apiHelper.service';


@Injectable()

export class TaskService {
    private azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/tasks';
    private localApiUrl = 'http://localhost:2243/api/tasks';
   
    private _todos: BehaviorSubject<Array<ITask>>;
    private tasks: ITask[] = [];

    get todos() {
        return this._todos.asObservable();
    }
    private xxx: number;

    private jsonHeaders: RequestOptions;

    constructor(private http: Http, private apiHelper: ApiHelper) {
        this.tasks = [];
        this._todos = new BehaviorSubject(new Array<ITask>());

        this.jsonHeaders = new RequestOptions({ headers: apiHelper.getJsonHeaders() });
        this.loadInitialData();
    }

    translateTask(task: any): Task {
        return new Task(task.id, task.title, task.deadline, task.isFinished);
    }

    loadInitialData() {
        console.log('loadInitialData');

        //ttt
        this.http.get(this.localApiUrl)
            .map((response: Response) => {
                let resp = response.json();
                let todos = resp.map(this.translateTask)
                //let todos = (<Object[]>response.json()).map((task: any) => new Task(task.id, task.title, task.deadline, task.isFinished));
                return todos;
            })
            .catch(this.handleError)
            .subscribe(res => {
                    this.tasks = res;
                    this._todos.next(res)
                }
            );
    }

    addTodo(newTodo: ITask): Observable<any> {
        let obs = this.http.post(this.localApiUrl, JSON.stringify(newTodo), this.jsonHeaders).share();

        obs.subscribe(
            res => {
                let t = res.json();
                let taskObject = new Task(t.id, t.title, t.deadline, t.isFinished);

                var temp = this._todos.getValue();
                temp.push(taskObject);
                this._todos.next(temp);
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
        let obs = this.http.delete(this.localApiUrl + "/" + task.id, this.jsonHeaders).share();

        obs.subscribe(
            res => {
                /*let t = res.json();
                let taskObject = new Task(t.id, t.title, t.deadline, t.isFinished);
*/
                var temp = this._todos.getValue();
                var index = temp.findIndex((tt) => tt.id === task.id, 0);
                if (index > -1) {
                    temp.splice(index, 1);
                    this._todos.next(temp);
                }
            },
            err => console.log('ellol. xd'));

        return obs;
    }
    
    saveTask(task: ITask): void {

        if (task.id == null) {
            this.http.post(this.localApiUrl, JSON.stringify(task), this.jsonHeaders)
                .map(responseData => {
                    return responseData.json();
                })
                .catch(this.handleError)
                .subscribe(data => {
                    this.tasks.push(data);
                    this._todos.next(this.tasks);
                    //this.subject.next(this.tasks);
                });
        } else {
            this.http.put(this.localApiUrl, JSON.stringify(task), this.jsonHeaders)
                .map(responseData => {
                    return responseData.json();
                })
                .catch(this.handleError)
                .subscribe(data => {
                    let updatedTaskIndex = this.tasks.findIndex(t => t.id == data.id);

                    if (updatedTaskIndex) {
                        this.tasks[updatedTaskIndex] = data;
                        this._todos.next(this.tasks);
                        //this.subject.next(this.tasks);
                    }
                });
        }
    }

    finishTask(taskId: number): void {
        this.http.get(this.localApiUrl + '/FinishTask');
    }

    /*getTasks(): Observable<Task[]> {
        return this.subject.asObservable();
    }*/

    getTask(id: number): ITask {
        return this.tasks.find(t => t.id == id);
    }

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

    private handleError(error: any): any {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead

        //console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}