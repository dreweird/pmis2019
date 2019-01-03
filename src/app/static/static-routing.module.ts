import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { LoginPageComponent } from '@app/core/user/containers/login-page.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'anms.menu.about' }
  },
  {
    path: 'features',
    component: FeaturesComponent,
    data: { title: 'anms.menu.features' }
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
