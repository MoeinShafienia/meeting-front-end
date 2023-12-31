import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './components/overview/overview.component';
import { DemoNgZorroAntdModule } from './ng-zorro/ng-zorro-antd.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component'
import { SignupComponent} from './components/signup/signup.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AddstudentsComponent } from './components/addstudents/addstudents.component';
import {DeletestudentsComponent} from './components/deletestudents/deletestudents.component';
import { EditstudentsComponent } from './components/editstudents/editstudents.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import {MeetingComponent} from './components/meeting/meeting.component';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    PagenotfoundComponent,
    routingComponents,
    SignupComponent,
    ResetpasswordComponent,
    AddstudentsComponent,
    DeletestudentsComponent,
    EditstudentsComponent,
    MeetingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    DragDropModule,
    ScrollingModule,
    HttpClientJsonpModule,
    NzFormModule,
    NzDatePickerModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
