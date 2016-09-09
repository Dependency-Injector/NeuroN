System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BlogEntry;
    return {
        setters:[],
        execute: function() {
            class BlogEntry {
                constructor(obj) {
                    this.id = obj && obj.id || 0;
                    this.title = obj && obj.title || '';
                    this.content = obj && obj.description || '';
                    this.created = obj && obj.created || new Date();
                }
            }
            exports_1("BlogEntry", BlogEntry);
        }
    }
});
//# sourceMappingURL=blog-entry.js.map