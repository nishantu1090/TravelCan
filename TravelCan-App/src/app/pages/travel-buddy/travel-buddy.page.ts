import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelBuddyService} from './../../services/travel-buddy.service';
import {map} from 'rxjs/operators';
import { TravelBuddy } from 'src/app/models/TravelBuddy';

@Component({
  selector: 'app-travel-buddy',
  templateUrl: './travel-buddy.page.html',
  styleUrls: ['./travel-buddy.page.scss'],
})
export class TravelBuddyPage implements OnInit {

  travelBuddies: TravelBuddy[];
  results: Observable<any>;
  constructor(private travelBuddyService : TravelBuddyService) { }

  ngOnInit() {
  }

  getBuddies(){
    
    this.travelBuddies = this.travelBuddyService.getTravelBuddies();
    console.log('in component', this.travelBuddies);
  }
}


