export interface ITask {
    id?: number;
    title: string;
    deadline: string;
    isFinished?: boolean;
}

export class Task implements ITask {
    constructor(
        public id: number,
        public title: string,
        public deadline: string,
        public isFinished: boolean) {
    }
    
    calculateRemainingDays(currentDay: number): number {
        return 4;
    }
}