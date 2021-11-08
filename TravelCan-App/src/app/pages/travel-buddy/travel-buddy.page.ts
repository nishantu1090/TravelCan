import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelBuddyService} from './../../services/travel-buddy.service';
import {map} from 'rxjs/operators';
import { TravelBuddy } from 'src/app/models/TravelBuddy';
import { Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-travel-buddy',
  templateUrl: './travel-buddy.page.html',
  styleUrls: ['./travel-buddy.page.scss'],
})
export class TravelBuddyPage implements OnInit {

  travelBuddies: TravelBuddy[];
  results: Observable<any>;
  travelPlanAdded : Boolean;
  user:SocialUser;
  travelPlan = {
    firstName: '',
    lastName: '',
    origin: '',
    email: '',
    doj:'',
    destination: ' '

  }
  userName : String;
  constructor(private travelBuddyService : TravelBuddyService,
              private socialAuthService: SocialAuthService) { }

  ngOnInit() {
    this.travelPlanAdded = false;
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      
      console.log('travelbuddy user', this.user);
    });
  }

  getBuddies(){
    
    if(!this.travelPlanAdded){
      return;
    }
    this.travelBuddies = this.travelBuddyService.getTravelBuddies();
    console.log('in component', this.travelBuddies);
  }

  addTravelPlan(form: NgForm){
    this.travelPlan.firstName = this.user.firstName;
    this.travelPlan.lastName = this.user.lastName;
    this.travelPlan.email = this.user.email;
    this.travelPlan.origin = form.value.origin;
    this.travelPlan.destination = form.value.destination;
    this.travelPlan.doj = form.value.doj.substring(0,10);
    console.log(this.travelPlan);
    console.log(form);
    console.log(this.user.email);   
    this.travelPlanAdded = true;

    this.travelBuddyService.addTravelPlan(this.travelPlan);
  }
}


