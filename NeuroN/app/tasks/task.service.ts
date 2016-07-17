import { Injectable } from 'angular2/core';
import { ITask } from './task'

@Injectable()

export class TaskService {
    getAllTasks(): ITask[] {
        return this.tasks;
    }

    getTask(id: number): ITask {
        return this.tasks[0];
    }

    tasks: ITask[] = [
        {
            id: 0,
            title: 'task 1',
            priority: 3,
            finished: false,
            deadline: 'today',
            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
        }, {
            id: 1,
            title: 'task 2',
            priority: 1,
            finished: true,
            deadline: 'yesterday',
            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
        }, {
            id: 2,
            title: 'task 3',
            priority: 2,
            finished: false,
            deadline: 'today',
            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
        }
    ];
}