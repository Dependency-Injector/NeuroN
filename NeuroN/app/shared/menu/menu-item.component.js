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
    var MenuItemComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let MenuItemComponent = class MenuItemComponent {
                constructor() {
                    this.menuItemSelected = new core_1.EventEmitter();
                }
                menuItemClicked() {
                    this.menuItemSelected.emit(this.route);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], MenuItemComponent.prototype, "label", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], MenuItemComponent.prototype, "icon", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], MenuItemComponent.prototype, "route", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', core_1.EventEmitter)
            ], MenuItemComponent.prototype, "menuItemSelected", void 0);
            MenuItemComponent = __decorate([
                core_1.Component({
                    selector: 'nn-menu-item',
                    templateUrl: 'app/shared/menu/menu-item.component.html',
                    styleUrls: ['app/shared/menu/menu-item.component.css'],
                    host: {
                        'class': 'nn-menu-item'
                    }
                }), 
                __metadata('design:paramtypes', [])
            ], MenuItemComponent);
            exports_1("MenuItemComponent", MenuItemComponent);
        }
    }
});
//# sourceMappingURL=menu-item.component.js.map