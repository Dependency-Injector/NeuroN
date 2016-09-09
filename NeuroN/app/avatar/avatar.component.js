System.register(['@angular/core', './shared/avatar.service'], function(exports_1, context_1) {
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
    var core_1, avatar_service_1;
    var AvatarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (avatar_service_1_1) {
                avatar_service_1 = avatar_service_1_1;
            }],
        execute: function() {
            let AvatarComponent = class AvatarComponent {
                constructor(avatarService) {
                    this.avatarService = avatarService;
                    this.pageTitle = 'avatar page';
                    this.pageTitle = this.pageTitle + " . Route params: "; // + this.routeParams.get('id');
                }
                ngOnInit() {
                    this.avatarService.avatar.subscribe(avatar => this.avatar = avatar, err => console.log(err));
                }
            };
            AvatarComponent = __decorate([
                core_1.Component({
                    templateUrl: 'app/avatar/avatar.component.html'
                }), 
                __metadata('design:paramtypes', [(typeof (_a = typeof avatar_service_1.AvatarService !== 'undefined' && avatar_service_1.AvatarService) === 'function' && _a) || Object])
            ], AvatarComponent);
            exports_1("AvatarComponent", AvatarComponent);
        }
    }
    var _a;
});
//# sourceMappingURL=avatar.component.js.map