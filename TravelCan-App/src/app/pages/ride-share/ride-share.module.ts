import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideSharePageRoutingModule } from './ride-share-routing.module';

import { RideSharePage } from './ride-share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideSharePageRoutingModule
  ],
  declarations: [RideSharePage]
})
export class RideSharePageModule {}
