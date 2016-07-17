export interface ITask {
    id: number;
    title: string;
    priority: number;
    deadline: string;
    finished: boolean;
    imageUrl: string;
}

export class Task implements ITask {
    constructor(public id: number,
        public title: string,
        public priority: number,
        public deadline: string,
        public finished: boolean,
        public imageUrl: string) {
    }
    

    calculateRemainingDays(currentDay: number): number {
        return 4;
    }
}