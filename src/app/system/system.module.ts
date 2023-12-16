import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import {  NgModule } from "@angular/core";
import { SystemRoutingModule } from "./system-routing.module";
import { JobSearchAddComponent } from '../system/job-search-add/job-search-add.component';
import { JobCardComponent } from '../system/components/job-card/job-card.component';
import { ToolBarComponent } from '../system/components/tool-bar/tool-bar.component';
import { AddAdvertComponent } from '../system/components/add-advert/add-advert.component';
import { PersonalAccountComponent } from '../system/personal-account/personal-account.component';
import { SearchComponent } from '../system/components/search/search.component';
import { FilterCardPipe } from "../shared/pipes/filter.pipe";
import { AdCreatingPageComponent } from '../system/ad-creating-page/ad-creating-page.component';
import { SettingsComponent } from '../system/components/settings/settings.component';
import { ChangePasswordPageComponent } from '../system/change-password-page/change-password-page.component';
import { ResponseCardComponent } from '../system/components/response-card/response-card.component';
import { AddEditComponent } from "../system/components/add-edit/add-edit.component";
import { AddEditPageComponent } from '../system/add-edit-page/add-edit-page.component';
import { FooterComponent } from '../system/components/footer/footer.component';
import { SystemComponent } from "./system.component";


@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        SystemRoutingModule,
    ],
    declarations: [
      SystemComponent,
      JobSearchAddComponent,
      JobCardComponent,
      ToolBarComponent,
      AddAdvertComponent,
      PersonalAccountComponent,
      SearchComponent,
      FilterCardPipe,
      AdCreatingPageComponent,
      SettingsComponent,
      ChangePasswordPageComponent,
      ResponseCardComponent,
      AddEditComponent,
      AddEditPageComponent,
      FooterComponent
    ]

})
export class SystemModule{}