System.register(['angular2/core'], function(exports_1, context_1) {
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
    var TaskService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let TaskService = class TaskService {
                constructor() {
                    this.tasks = [
                        {
                            id: 0,
                            title: 'task 1',
                            priority: 3,
                            finished: false,
                            deadline: 'today',
                            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
                        }, {
                            id: 1,
                            title: 'task 2',
                            priority: 1,
                            finished: true,
                            deadline: 'yesterday',
                            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
                        }, {
                            id: 2,
                            title: 'task 3',
                            priority: 2,
                            finished: false,
                            deadline: 'today',
                            imageUrl: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffreeflaticons.net%2Fwp-content%2Fuploads%2F2014%2F10%2Ftask-copy-1412926696kng48.png&f=1'
                        }
                    ];
                }
                getAllTasks() {
                    return this.tasks;
                }
                getTask(id) {
                    return this.tasks[0];
                }
            };
            TaskService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [])
            ], TaskService);
            exports_1("TaskService", TaskService);
        }
    }
});
//# sourceMappingURL=task.service.js.map