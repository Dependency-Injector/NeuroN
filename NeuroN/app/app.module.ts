import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { TodoPageComponent } from './tasks/todo-page.component';
import { TaskService } from './tasks/task.service';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],

    declarations: [
        AppComponent,
        TodoPageComponent,
        AvatarComponent
    ],

    providers: [
        TaskService
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }