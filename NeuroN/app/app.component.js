System.register(['@angular/core', '@angular/router', './shared/utilities/channel.service'], function(exports_1, context_1) {
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
    var core_1, router_1, channel_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (channel_service_1_1) {
                channel_service_1 = channel_service_1_1;
            }],
        execute: function() {
            AppComponent = class AppComponent {
                constructor(router, channelService) {
                    this.router = router;
                    this.channelService = channelService;
                    /* this.connectionState = this.channelService.connectionState.map((state: ConnectionState) => {
                         return ConnectionState[state];
                     });
             
                     this.channelService.error.subscribe(
                         (error: any) => { console.warn(error); },
                         (error: any) => { console.error("errors$ error", error); });
             
                     this.channelService.starting.subscribe(
                         () => { console.log("signalr service has been started"); },
                         () => { console.log("signalr service failed to start"); });*/
                }
                onRouteSelected(route) {
                    console.log(route);
                    this.router.navigate([route]);
                }
                ngOnInit() {
                    // console.log("starting channel service");
                    // this.channelService.start();
                }
            };
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'nn-app',
                    templateUrl: 'app/app.component.html'
                }), 
                __metadata('design:paramtypes', [router_1.Router, channel_service_1.ChannelService])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map