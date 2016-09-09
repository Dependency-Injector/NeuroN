System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Avatar;
    return {
        setters:[],
        execute: function() {
            class Avatar {
                constructor(obj) {
                    this.id = obj && obj.id || 0;
                    this.name = obj && obj.name || '';
                    this.xp = obj && obj.xp || 0;
                    this.level = obj && obj.level || 0;
                }
            }
            exports_1("Avatar", Avatar);
        }
    }
});
//# sourceMappingURL=avatar.js.map