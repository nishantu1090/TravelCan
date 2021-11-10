import { Component, ElementRef,OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelBuddyService} from './../../services/travel-buddy.service';
import {map} from 'rxjs/operators';
import { TravelBuddy } from 'src/app/models/TravelBuddy';
import { Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TravelPlan } from 'src/app/models/TravelPlan';
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
  travelPlan : TravelPlan = new TravelPlan();
  @ViewChild('origin', { read: ElementRef }) origin : ElementRef;
  @ViewChild('destination',  { read: ElementRef }) destination : ElementRef;
  @ViewChild('doj',  { read: ElementRef }) doj: ElementRef;
  @ViewChild('flightNumber',  { read: ElementRef }) flightNumber: ElementRef;
  constructor(private travelBuddyService : TravelBuddyService,
              private socialAuthService: SocialAuthService) { }

  ngOnInit() {
    this.travelPlanAdded = false;
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      
      console.log('travelbuddy user', this.user);
    });
    
  }

  getBuddies(form: NgForm){
    console.log('getBuddies-travel-plan',this.travelPlan);
    console.log('searching for origin',this.origin.nativeElement.value);
    //console.log('searchind flight number', this.flightNumber);
    /*if(!this.travelPlanAdded){
      return;
    }*/

    this.travelPlan.doj = this.doj.nativeElement.value.substring(0,10);
    this.travelPlan.flightNumber = this.flightNumber.nativeElement.value;
    this.travelPlan.origin = this.origin.nativeElement.value;
    this.travelBuddies = this.travelBuddyService.getTravelBuddies(this.travelPlan);
    console.log('in component', this.travelBuddies);
  }

  addTravelPlan(form: NgForm){
    this.travelPlan.firstName = this.user.firstName;
    this.travelPlan.lastName = this.user.lastName;
    this.travelPlan.email = this.user.email;
    this.travelPlan.origin = form.value.origin;
    this.travelPlan.destination = form.value.destination;
    this.travelPlan.doj = form.value.doj.substring(0,10);
    this.travelPlan.flightNumber = form.value.flightNumber;
    console.log(this.travelPlan);
    
    this.travelPlanAdded = true;

    this.travelBuddyService.addTravelPlan(this.travelPlan);
  }
}


