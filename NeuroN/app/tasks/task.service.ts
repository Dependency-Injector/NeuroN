import { Injectable } from 'angular2/core';
import { ITask, Task } from './task';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class TaskService {
    private azureTasksApiUrl = 'http://neuronapi.azurewebsites.net/api/tasks';
    private tasksApiUrl = 'api/tasks/tasks.json';
    private tasks: Task[] = [];
    private subject: Subject<Task[]> = new Subject<Task[]>();
    
    constructor(private http: Http) {
        this.obtainTasksFromJson();
    }

    addTask(newTask: Task): void {
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
        this.http.get(this.tasksApiUrl)
            .map((responseData) => {
                return responseData.json();
            })
            .map((tasks: Array<any>) => {
                let result: Array<Task> = [];
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