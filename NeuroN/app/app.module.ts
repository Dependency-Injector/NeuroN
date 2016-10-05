﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MenuItemComponent } from './shared/menu/menu-item.component';
import { TodoPageComponent } from './tasks/todo-page.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { BlogComponent } from './blog/blog.component';
import { BlogEntryListComponent } from './blog/blog-entry-list/blog-entry-list.component';
import { EditBlogEntryComponent } from './blog/edit-blog-entry/edit-blog-entry.component';
import { AvatarComponent } from './avatar/avatar.component';
import { NotificationComponent } from './shared/notification/notification.component';

import { TaskService } from './tasks/shared/task.service';
import { BlogService } from './blog/shared/blog.service';
import { AvatarService } from './avatar/shared/avatar.service';
import { NotificationService } from './shared/notification/shared/notification.service';
import { ChannelService, SignalrWindow, ChannelConfig } from './shared/utilities/channel.service';
import { ApiHelper } from './utilities/apiHelper.service';

let channelConfig = new ChannelConfig();
channelConfig.url = "http://localhost:9123/signalr";
channelConfig.hubName = "EventHub";

@NgModule({
    imports: [
        // Angular modules
        BrowserModule,
        FormsModule,
        HttpModule,

        // External modules
        DatepickerModule,
        routing
    ],

    declarations: [
        // Application
        AppComponent,
        MenuComponent,
        MenuItemComponent,

        // Todo page
        TodoPageComponent,
        EditTaskComponent,
        TaskListComponent,

        // Blog page
        BlogComponent,
        BlogEntryListComponent,
        EditBlogEntryComponent,

        // Avatar page
        AvatarComponent,
        NotificationComponent
    ],

    providers: [
        TaskService,
        BlogService,
        AvatarService,
        NotificationService,
        ChannelService,
        {   provide: SignalrWindow, useValue: window },
        {   provide: "channel.config", useValue: channelConfig },
        
        ApiHelper
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }