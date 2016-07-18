import { Injectable } from 'angular2/core';
import { ITask, Task } from './task';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class TaskService {
    private azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/tasks';
    private tasksApiUrl = 'api/tasks/tasks.json';
    private tasks: ITask[] = [];
    private subject: Subject<ITask[]> = new Subject<ITask[]>();
    
    constructor(private http: Http) {
        this.obtainTasksFromJson();
    }

    addTask(newTask: ITask): void {
        this.http.post(this.azureTasksApiUrl, JSON.stringify(newTask))
            .map((responseData) => {
                console.log("Returned data: ");
                console.log(responseData);
            });

        this.tasks.push(newTask);
        this.subject.next(this.tasks);
    }

    getTasks(): Observable<Task[]> {
        return this.subject.asObservable();
    }

    getTask(id: number): ITask {
        return this.tasks[0];
    }

    private obtainTasksFromJson(): void {
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
                        result.push(new Task(task.id, task.title, 3, '', false, ''));
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