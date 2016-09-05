System.register(['@angular/core', './task.service'], function(exports_1, context_1) {
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
    var core_1, task_service_1;
    var TaskListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            }],
        execute: function() {
            let TaskListComponent = class TaskListComponent {
                constructor(taskService) {
                    this.taskService = taskService;
                    this.editTaskClicked = new core_1.EventEmitter();
                    this.imageHeight = 50;
                    this.imageWidth = 40;
                    this.showImage = false;
                    this.listFilter = 'task';
                    this.pageTitle = 'Todo';
                }
                toggleImage() {
                    this.showImage = !this.showImage;
                }
                editTask(taskId) {
                    this.editTaskClicked.emit(taskId);
                }
                finishTask(taskId) {
                    this.taskService.finishTask(taskId);
                }
                setDate(date) {
                    return new Date(date);
                }
                ngOnInit() {
                    this.taskService.todos.subscribe((tasks) => {
                        this.tasks = tasks;
                        console.log('task list has new list');
                    });
                }
                ngOnChanges(changes) {
                    if (changes.tasks)
                        this.tasks = changes.tasks.currentValue;
                }
                onPriorityClicked(message) {
                    //this.pageTitle = "Product list " + message;
                }
            };
            __decorate([
                core_1.Output(), 
                __metadata('design:type', core_1.EventEmitter)
            ], TaskListComponent.prototype, "editTaskClicked", void 0);
            TaskListComponent = __decorate([
                core_1.Component({
                    selector: 'nn-task-list',
                    templateUrl: 'app/tasks/task-list.component.html',
                    styleUrls: ['app/tasks/task-list.component.css']
                }), 
                __metadata('design:paramtypes', [task_service_1.TaskService])
            ], TaskListComponent);
            exports_1("TaskListComponent", TaskListComponent);
        }
    }
});
//# sourceMappingURL=task-list.component.js.map