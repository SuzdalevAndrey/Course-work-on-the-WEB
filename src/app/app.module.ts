import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AuthModule } from './auth/auth.module';
import { UsersService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SystemModule } from './system/system.module';
import { RouterModule } from '@angular/router';
import { JobService } from './shared/services/job.service';


@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SystemModule,
    RouterModule
  ],
  providers: [UsersService,AuthService,JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
