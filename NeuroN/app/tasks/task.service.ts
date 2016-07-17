import { Injectable } from 'angular2/core';
import { ITask, Task } from './task';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
//import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()

export class TaskService {
    private azureTasksApiUrl: string = 'http://neuronapi.azurewebsites.net/api/tasks';
    tasksApiUrl = 'api/tasks/tasks.json';
    private tasks: Observable<ITask[]>;

    constructor(private http: Http) {
  //      let task = new Task(4, 'tittttleee', 3, 'today', false, '');
    //    Cookie.set('task1', JSON.stringify(task));

      //  let taskReceived = Cookie.get('task1');
    }
    
    getAllTasks(): Observable<ITask[]> {
        //let tasksCookies = Cookie.get('tasks');

        //if (!tasksCookies)
        //    tasksCookies.set('tasks', )
        this.tasks = this.http.get(this.tasksApiUrl)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);

        return this.tasks;
    }

    private handleError(error: Response): any {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getTask(id: number): ITask {
        return this.tasks[0];
    }

    addTask(task: ITask) {
        //let newTasks: ITask[] = [task];
   
       /* this.http.post(this.tasksApiUrl, JSON.stringify(task))
            .map(response => response.json())
            .subscribe(data => {
                this.tasks.push(data);
                this.tasks$.next(this.tasks)
                //this.tasks.next(this.dataStore.todos);
            }, error => console.log('Could not create todo.'));
        */
    }
}