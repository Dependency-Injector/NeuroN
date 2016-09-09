System.register(['@angular/core', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var TodoPageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            let TodoPageComponent = class TodoPageComponent {
                constructor() {
                    this.pageTitle = 'Todo page';
                    //taskListTitle: string = 'Todo list';
                    this.editedTaskId = null;
                    this.tasks = [];
                }
                //editedTaskId: ITask = null;
                onTaskCreated($event) {
                    console.log('Event sent to app: ');
                    console.log($event);
                    var newTasks = [$event];
                    this.tasks = this.tasks.concat(newTasks);
                    //this.taskListTitle = 'Todo list edited';
                }
                onEditTask($event) {
                    //this.editedTaskId = $event;
                    this.editedTaskId = $event;
                }
            };
            TodoPageComponent = __decorate([
                core_1.Component({
                    templateUrl: 'app/tasks/todo-page.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], TodoPageComponent);
            exports_1("TodoPageComponent", TodoPageComponent);
        }
    }
});
//# sourceMappingURL=todo-page.component.js.map