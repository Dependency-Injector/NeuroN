import { Pipe, PipeTransform } from 'angular2/core';
import { ITask } from './task';

@Pipe({
    name: 'taskFilter'
})

export class TaskFilterPipe implements PipeTransform {
    transform(value: ITask[], args: string[]): ITask[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((task: ITask) => 
            task.title.toLocaleLowerCase().indexOf(filter) != -1) : value;
    }    
}