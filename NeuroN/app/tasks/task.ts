export interface ITask {
    id: number;
    title: string;
    priority: number;
    deadline: string;
    isFinished: boolean;
    imageUrl: string;
}

export class Task implements ITask {
    constructor(public id: number,
        public title: string,
        public priority: number,
        public deadline: string,
        public isFinished: boolean,
        public imageUrl: string) {
        
    }
    /*constructor(values: Object = {}) {
        Object.assign(this, values);
    }*/

    calculateRemainingDays(currentDay: number): number {
        return 4;
    }
}