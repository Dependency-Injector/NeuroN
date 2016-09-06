export interface IBlogEntry {
    id: number;
    title: string;
    content: string;
    created: Date;
}

export class BlogEntry implements IBlogEntry {
    id: number;
    title: string;
    content: string;
    created: Date;

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.title = obj && obj.title || '';
        this.content = obj && obj.description || '';
        this.created = obj && obj.created || new Date();
    }
}

