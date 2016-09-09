System.register(['@angular/core', '@angular/http', './avatar', 'rxjs/add/operator/map', 'rxjs/add/operator/catch', 'rxjs/Rx', './../../utilities/apiHelper.service'], function(exports_1, context_1) {
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
    var core_1, http_1, avatar_1, Rx_1, apiHelper_service_1;
    var AvatarService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (avatar_1_1) {
                avatar_1 = avatar_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (apiHelper_service_1_1) {
                apiHelper_service_1 = apiHelper_service_1_1;
            }],
        execute: function() {
            let AvatarService = class AvatarService {
                constructor(http, apiHelper) {
                    this.http = http;
                    this.apiHelper = apiHelper;
                    this.azureTasksApiUrl = 'http://apineuro.azurewebsites.net/api/avatar';
                    this.localApiUrl = 'http://localhost:2243/api/avatar';
                    this.stream = new Rx_1.BehaviorSubject(new avatar_1.Avatar());
                    this._avatar = new avatar_1.Avatar();
                    this.requestOptions = new http_1.RequestOptions({ headers: apiHelper.getJsonHeaders() });
                    this.loadAvatar();
                }
                get avatar() {
                    return this.stream.asObservable();
                }
                loadAvatar() {
                    this.http.get(this.localApiUrl)
                        .map((response) => response.json())
                        .subscribe(data => {
                        this._avatar = data[0];
                        this.stream.next(this._avatar);
                    }, error => {
                        console.log('Could not load blog posts. Error: ');
                        console.log(error);
                    });
                }
            };
            AvatarService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http, apiHelper_service_1.ApiHelper])
            ], AvatarService);
            exports_1("AvatarService", AvatarService);
        }
    }
});
//# sourceMappingURL=avatar.service.js.map