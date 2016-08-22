System.register(['@angular/core', '@angular/http', '@angular/router', 'rxjs/Rx', './shared/menu/menu.component', './shared/menu/menu-item.component', './utilities/apiHelper.service'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, menu_component_1, menu_item_component_1, apiHelper_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (menu_item_component_1_1) {
                menu_item_component_1 = menu_item_component_1_1;
            },
            function (apiHelper_service_1_1) {
                apiHelper_service_1 = apiHelper_service_1_1;
            }],
        execute: function() {
            let AppComponent = class AppComponent {
                constructor(router) {
                    this.router = router;
                    this.pageTitle = 'NeuroN FrameworK';
                    this.taskListTitle = 'Todo list';
                }
                /*onTaskAdded($event) {
                    console.log('Event sent to app: ');
                    console.log($event);
                    var newTasks: ITask[] = [$event];
            
                    this.tasks = this.tasks.concat(newTasks);
                    this.taskListTitle = 'Todo list edited';
                }
            
                tasks: ITask[] = [];*/
                onRouteSelected(route) {
                    console.log(route);
                    this.router.navigate([route]);
                }
            };
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'nn-app',
                    templateUrl: 'app/app.component.html',
                    directives: [menu_component_1.MenuComponent, menu_item_component_1.MenuItemComponent],
                    providers: [http_1.HTTP_PROVIDERS, apiHelper_service_1.ApiHelper]
                }), 
                __metadata('design:paramtypes', [router_1.Router])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map