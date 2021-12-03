import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelBuddyPage } from './travel-buddy.page';

const routes: Routes = [
  {
    path: '',
    component: TravelBuddyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelBuddyPageRoutingModule {}
