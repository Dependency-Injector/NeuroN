import { Injectable } from 'angular2/core';
import { ITask, Task } from './task';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class TaskService {
    private azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/tasks';
    private localApiUrl = 'http://localhost:2243/api/tasks';
    private tasksApiUrl = 'api/tasks/tasks.json';
    private tasks: ITask[] = [];
    private subject: Subject<ITask[]> = new Subject<ITask[]>();
    
    constructor(private http: Http) {
        this.obtainTasksFromApi();
    }

    createNewTask(title: string, deadline: string): ITask {
        return new Task(null, title, deadline, false);
    }

    createNewEmptyTask(): ITask {
        return this.createNewTask('', new Date().toDateString());
    }

    saveTask(task: ITask): void {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });

        if (task.id == null) {
            this.http.post(this.localApiUrl, JSON.stringify(task), { headers: headers })
                .map(responseData => {
                    return responseData.json();
                })
                .catch(this.handleError)
                .subscribe(data => {
                    this.tasks.push(data);
                    this.subject.next(this.tasks);
                });
        } else {
            this.http.put(this.localApiUrl, JSON.stringify(task), { headers: headers })
                .map(responseData => {
                    return responseData.json();
                })
                .catch(this.handleError)
                .subscribe(data => {
                    let updatedTaskIndex = this.tasks.findIndex(t => t.id == data.id);

                    if (updatedTaskIndex) {
                        this.tasks[updatedTaskIndex] = data;
                        this.subject.next(this.tasks);
                    }
                });
        }
    }

    getTasks(): Observable<Task[]> {
        return this.subject.asObservable();
    }

    getTask(id: number): ITask {
        return this.tasks.find(t => t.id == id);
    }

    private obtainTasksFromApi(): void {

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
                this.tasks = res;
                this.subject.next(this.tasks);
            });
    }

    private handleError(error: Response): any {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}