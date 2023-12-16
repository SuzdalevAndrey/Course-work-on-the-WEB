import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemComponent } from "./system.component";
import { JobSearchAddComponent } from '../system/job-search-add/job-search-add.component';
import { AddAdvertComponent } from '../system/components/add-advert/add-advert.component';
import { PersonalAccountComponent } from '../system/personal-account/personal-account.component';
import { AdCreatingPageComponent } from '../system/ad-creating-page/ad-creating-page.component';
import { ChangePasswordPageComponent } from '../system/change-password-page/change-password-page.component';
import { AddEditPageComponent } from '../system/add-edit-page/add-edit-page.component';

const routes: Routes=[
    {path:'system', component: SystemComponent,children:[
        {path:'job-search-add', component:JobSearchAddComponent},
        {path:'add-advert', component:AddAdvertComponent},
        {path:'personal-account', component:PersonalAccountComponent},
        {path:'ad-creating-page', component:AdCreatingPageComponent},
        {path:'change-password-page', component:ChangePasswordPageComponent},
        {path:'add-edit-page', component:AddEditPageComponent}
    ]}
    
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class SystemRoutingModule {}