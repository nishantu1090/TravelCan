import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelBuddyPageRoutingModule } from './travel-buddy-routing.module';

import { TravelBuddyPage } from './travel-buddy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelBuddyPageRoutingModule
  ],
  declarations: [TravelBuddyPage]
})
export class TravelBuddyPageModule {}
