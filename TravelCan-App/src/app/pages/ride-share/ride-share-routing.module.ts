import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideSharePage } from './ride-share.page';

const routes: Routes = [
  {
    path: '',
    component: RideSharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideSharePageRoutingModule {}
