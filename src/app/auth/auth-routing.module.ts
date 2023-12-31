import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {path:'auth', component:AuthComponent,children:[
    {path: 'login', component: LoginComponent},
    {path:'registration', component:RegistrationsComponent}
  ]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
