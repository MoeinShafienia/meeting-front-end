import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SignupComponent} from './components/signup/signup.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import {MeetingComponent} from './components/meeting/meeting.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'overview', component: OverviewComponent, canActivate:[AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'resetpassword', component: ResetpasswordComponent, canActivate:[AuthGuard]},
  {path: 'meeting', component: MeetingComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OverviewComponent, PagenotfoundComponent, LoginComponent, SignupComponent, ResetpasswordComponent, MeetingComponent]
