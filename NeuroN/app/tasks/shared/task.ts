import * as moment from 'moment';
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

export interface ITask {
    id: number;
    title: string;
    deadline: string;
    isFinished: boolean;

    getRemainingDays(): number;
}


export class Task implements ITask {
    constructor(
        public id: number = 0,
        public title: string = '',
        public deadline: string = '',
        public isFinished: boolean = false) {
    }
    
    getRemainingDays(): number {
        let today = momentConstructor(new Date()).startOf('day');
        let deadlineDate = momentConstructor(this.deadline).add(1, 'day').startOf('day');

        let remainingDays = deadlineDate.diff(today, 'day');

        //let remainingDays = momentConstructor(this.deadline).startOf('day').diff(today., 'day');
    
        return remainingDays;
    }
}