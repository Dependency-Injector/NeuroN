export interface IAvatar {
    id: number;
    name: string;
    xp: number;
    level: number;
}

export class Avatar implements IAvatar {
    id: number;
    name: string;
    xp: number;
    level: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.name = obj && obj.name || '';
        this.xp = obj && obj.xp || 0;
        this.level = obj && obj.level || 0;
    }
}

