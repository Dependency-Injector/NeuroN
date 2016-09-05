export interface IBlogEntry {
    id: number;
    title: string;
    content: string;
    created: Date;
}

export class BlogEntry {
    id: number;
    title: string;
    content: string;
    created: Date;

    constructor(public obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.content = obj && obj.description || null;
        this.created = obj && obj.created || null;
    }
}
