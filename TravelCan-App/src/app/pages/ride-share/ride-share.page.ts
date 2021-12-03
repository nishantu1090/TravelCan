import { Component, ElementRef,OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RideShareService} from './../../services/ride-share.service';
import {map} from 'rxjs/operators';
import { RideDetails } from 'src/app/models/RideDetails';
import { Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { RidePlanDetails } from 'src/app/models/RidePlanDetails';

@Component({
  selector: 'app-ride-share',
  templateUrl: './ride-share.page.html',
  styleUrls: ['./ride-share.page.scss'],
})
export class RideSharePage implements OnInit {

  ridePlanDetails: RidePlanDetails[]; // need to figure out
  filteredRidePlanDetails : RidePlanDetails[] = []; //need to figure out
  results: Observable<any>;
  rideDetailsAdded : Boolean; //doubt on this flag value
  user:SocialUser = new SocialUser();
  rideDetails : RideDetails = new RideDetails();
  @ViewChild('airportName', { read: ElementRef }) airportName : ElementRef; //make sure to add these names to the UI
  @ViewChild('destination',  { read: ElementRef }) destination : ElementRef;
  @ViewChild('exitTerminalNumber',  { read: ElementRef }) exitTerminalNumber: ElementRef;
  @ViewChild('numberOfPassengers',  { read: ElementRef }) numberOfPassengers: ElementRef;
  @ViewChild('numberOfLuggages',  { read: ElementRef }) numberOfLuggages: ElementRef;
  @ViewChild('contactNumber',  { read: ElementRef }) contactNumber: ElementRef;
  @ViewChild('dateOfRide',  { read: ElementRef }) dateOfRide: ElementRef;
  @ViewChild('timeOfRide',  { read: ElementRef }) timeOfRide: ElementRef;
  @ViewChild('addRideDetailsBtn', {read: ElementRef}) addRideDetailsBtn : ElementRef; // note the name of the button
  constructor(private rideShareService : RideShareService, //Note the name of the service
              private socialAuthService: SocialAuthService) { }

  ngOnInit() {
    this.rideDetailsAdded = false;
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      
      console.log('user', this.user);
    });
    
  }

  getRideDetails(form: NgForm){
    console.log('RIDE DETAILS',this.rideDetails);
    console.log('AIRPORT NAME',this.airportName.nativeElement.value);
    console.log('DESTINATION',this.destination.nativeElement.value);

   

    //this.travelPlan.doj = this.doj.nativeElement.value.substring(0,10); //doubt if it is this way for date-time
    this.rideDetails.airportName = this.airportName.nativeElement.value;
    this.rideDetails.destination = this.destination.nativeElement.value; //need to understand
    this.rideDetails.exitTerminalNumber = this.exitTerminalNumber.nativeElement.value;
    this.rideDetails.numberOfPassengers = this.numberOfPassengers.nativeElement.value;
    this.rideDetails.numberOfLuggages = this.numberOfLuggages.nativeElement.value;
    this.rideDetails.contactNumber = this.contactNumber.nativeElement.value;
    this.rideDetails.dateOfRide = this.dateOfRide.nativeElement.value;
    this.rideDetails.timeOfRide = this.timeOfRide.nativeElement.value.substring(0,10); //doubt if it is this way for date-time
    this.ridePlanDetails = this.rideShareService.getRideDetails(this.rideDetails);
    console.log("return from service");
    
    console.log(this.ridePlanDetails.length);
    console.log('in component', this.ridePlanDetails);
  }  

  addRideDetails(form: NgForm){
    this.rideDetails.firstName = this.user.firstName;
    this.rideDetails.lastName = this.user.lastName;
    this.rideDetails.airportName = form.value.airportName;
    this.rideDetails.destination = form.value.destination;
    this.rideDetails.exitTerminalNumber = form.value.exitTerminalNumber;
    this.rideDetails.numberOfPassengers = form.value.numberOfPassengers;
    this.rideDetails.numberOfLuggages = form.value.numberOfLuggages;
    this.rideDetails.contactNumber = form.value.contactNumber;
    this.rideDetails.dateOfRide = form.value.dateOfRide;
    this.rideDetails.timeOfRide = form.value.timeOfRide.substring(0,10);
    console.log(this.rideDetails);
    
    this.rideDetailsAdded = true;
    this.addRideDetailsBtn.nativeElement.innerHTML= "Add Another Ride";
    console.log(this.addRideDetailsBtn.nativeElement);
    this.rideShareService.addRideDetails(this.rideDetails);
  }

}
