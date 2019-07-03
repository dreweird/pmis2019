import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MomentModule } from 'ngx-moment';
import { AgGridModule } from 'ag-grid-angular/main';
import { DashboardProgramComponent } from './dashboard-program/dashboard-program.component';


@NgModule({
  imports: [SharedModule, StaticRoutingModule, MomentModule, AgGridModule.withComponents([])],
  declarations: [AboutComponent, FeaturesComponent, DashboardComponent, DashboardProgramComponent]
})
export class StaticModule {}
