//import { HTTP_PROVIDERS } from '@angular/http';
System.register(['./shared/utilities/items.service', './shared/utilities/config.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var items_service_1, config_service_1;
    var APP_PROVIDERS;
    return {
        setters:[
            function (items_service_1_1) {
                items_service_1 = items_service_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            }],
        execute: function() {
            exports_1("APP_PROVIDERS", APP_PROVIDERS = [
                //HTTP_PROVIDERS,
                items_service_1.ItemsService,
                config_service_1.ConfigService,
            ]);
        }
    }
});
//# sourceMappingURL=app.providers.js.map