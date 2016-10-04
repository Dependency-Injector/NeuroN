export interface INotification {
    id: number;
    content: string;
    type: string;
    date: Date;
}

export class Notification implements INotification {
    id: number;
    content: string;
    type: string;
    date: Date;

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.content = obj && obj.content || '';
        this.type = obj && obj.type || '';
        this.date = obj && obj.date || new Date();
    }
}

