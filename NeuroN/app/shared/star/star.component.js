System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var StarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let StarComponent = class StarComponent {
                constructor() {
                    this.priorityClicked = new core_1.EventEmitter();
                }
                ngOnChanges() {
                    this.starWidth = this.priority * 86 / 5;
                }
                onClick() {
                    this.priorityClicked.emit('The priority ' + this.priority + ' clicked');
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Number)
            ], StarComponent.prototype, "priority", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', core_1.EventEmitter)
            ], StarComponent.prototype, "priorityClicked", void 0);
            StarComponent = __decorate([
                core_1.Component({
                    selector: 'nn-star',
                    templateUrl: 'app/shared/star/star.component.html',
                    styleUrls: ['app/shared/star/star.component.css']
                }), 
                __metadata('design:paramtypes', [])
            ], StarComponent);
            exports_1("StarComponent", StarComponent);
        }
    }
});
//# sourceMappingURL=star.component.js.map