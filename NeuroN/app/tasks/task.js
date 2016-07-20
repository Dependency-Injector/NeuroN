System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Task;
    return {
        setters:[],
        execute: function() {
            class Task {
                constructor(id, title, deadline, isFinished) {
                    this.id = id;
                    this.title = title;
                    this.deadline = deadline;
                    this.isFinished = isFinished;
                }
                calculateRemainingDays(currentDay) {
                    return 4;
                }
            }
            exports_1("Task", Task);
        }
    }
});
//# sourceMappingURL=task.js.map