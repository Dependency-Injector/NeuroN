export interface IProgressUnit {
    id: number;
    source: number;
    xp: number;
    xpMultiplier: number;
    occured: Date;
    associatedEntityId?: number;
}

export class ProgressUnit implements IProgressUnit {
    id: number;
    xp: number;
    level: number;
    associatedEntityId: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.source = obj && obj.source || 0;
        this.xp = obj && obj.xp || 0;
        this.xpMultiplier = obj && obj.xpMultiplier || 0;
        this.occured = obj && obj.occured || null;
        this.associatedEntityId = obj && obj.associatedEntityId || 0;
    }

    source: number;
    xpMultiplier: number;
    occured: Date;
}

