System.register(['@angular/core', 'lodash'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, _;
    var ItemsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            let ItemsService = class ItemsService {
                constructor() {
                }
                removeItemFromArray(array, item) {
                    _.remove(array, function (current) {
                        return JSON.stringify(current) === JSON.stringify(item);
                    });
                }
                removeItems(array, predicate) {
                    _.remove(array, predicate);
                }
                setItem(array, predicate, item) {
                    let oldItem = _.find(array, predicate);
                    if (oldItem) {
                        let index = _.indexOf(array, oldItem);
                        array.splice(index, 1, item);
                    }
                    else {
                        array.push(item);
                    }
                }
                addItemToStart(array, item) {
                    array.splice(0, 0, item);
                }
                getPropertyValues(array, property) {
                    let result = _.map(array, property);
                    return result;
                }
                getSerialized(arg) {
                    return JSON.parse(JSON.stringify(arg));
                }
            };
            ItemsService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [])
            ], ItemsService);
            exports_1("ItemsService", ItemsService);
        }
    }
});
//# sourceMappingURL=items.service.js.map