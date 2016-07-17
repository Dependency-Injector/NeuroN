System.register(['angular2/core', './task', './task.service'], function(exports_1, context_1) {
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
    var core_1, task_1, task_service_1;
    var EditTaskComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (task_1_1) {
                task_1 = task_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            }],
        execute: function() {
            let EditTaskComponent = class EditTaskComponent {
                constructor(taskService) {
                    this.taskService = taskService;
                    this.taskAdded = new core_1.EventEmitter();
                }
                add() {
                    this.task = new task_1.Task(4, this.title, this.priority, this.deadline, false, '');
                    this.taskService.addTask(this.task);
                    this.clear();
                }
                saveChanges() {
                }
                discardChanges() {
                    this.clear();
                }
                clear() {
                    this.title = '';
                    this.priority = 0;
                    this.deadline = '';
                }
            };
            __decorate([
                core_1.Output(), 
                __metadata('design:type', core_1.EventEmitter)
            ], EditTaskComponent.prototype, "taskAdded", void 0);
            EditTaskComponent = __decorate([
                core_1.Component({
                    selector: 'nn-edit-task',
                    templateUrl: 'app/tasks/edit-task.component.html',
                    styleUrls: ['app/tasks/edit-task.component.css']
                }), 
                __metadata('design:paramtypes', [task_service_1.TaskService])
            ], EditTaskComponent);
            exports_1("EditTaskComponent", EditTaskComponent);
        }
    }
});
//# sourceMappingURL=edit-task.component.js.map