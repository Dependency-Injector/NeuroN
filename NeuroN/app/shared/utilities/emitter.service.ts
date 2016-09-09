import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class EmitterService {
    // Event store
    private static emitters: { [ID: string]: EventEmitter<any> } = {};

    // Set a new event in the store with a given ID as key
    static get(ID: string): EventEmitter<any> {
        if (!this.emitters[ID])
            this.emitters[ID] = new EventEmitter();

        return this.emitters[ID];
    }
}
