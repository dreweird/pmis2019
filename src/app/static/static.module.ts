import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MomentModule } from 'ngx-moment';


@NgModule({
  imports: [SharedModule, StaticRoutingModule, MomentModule],
  declarations: [AboutComponent, FeaturesComponent, DashboardComponent]
})
export class StaticModule {}
