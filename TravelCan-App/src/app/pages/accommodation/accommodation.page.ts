import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationService} from './../../services/accommodation.service';
import { AccommodationResponse } from 'src/app/models/AccommodationResponse';
import {map} from 'rxjs/operators';
import { AccommodationDetails } from 'src/app/models/AccommodationDetails';
import { Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.page.html',
  styleUrls: ['./accommodation.page.scss'],
})
export class AccommodationPage implements OnInit {
  [x: string]: any;
  
  accommodationDetails: AccommodationDetails[];
  accommodationResponse: AccommodationResponse[];
  filteredAccommodations : AccommodationDetails[] = [];
  results: Observable<any>;
  accommodationAdded : Boolean;
  user:SocialUser = new SocialUser();
  accommodation : AccommodationDetails = new AccommodationDetails();
  @ViewChild('city', { read: ElementRef }) city : ElementRef;
  @ViewChild('rentalCategory',  { read: ElementRef }) rentalCategory : ElementRef;
  @ViewChild('highestPrice',  { read: ElementRef }) highestPrice: ElementRef;
  @ViewChild('lowestPrice',  { read: ElementRef }) lowestPrice: ElementRef;
  @ViewChild('bedrooms', { read: ElementRef }) bedrooms : ElementRef;
  @ViewChild('bathrooms',  { read: ElementRef }) bathrooms : ElementRef;
  @ViewChild('utilities',  { read: ElementRef }) utilities: ElementRef;
  @ViewChild('parking',  { read: ElementRef }) parking: ElementRef;
  @ViewChild('furnished', { read: ElementRef }) furnished : ElementRef;
  @ViewChild('appliances',  { read: ElementRef }) appliances : ElementRef;
  @ViewChild('petFriendly',  { read: ElementRef }) petFriendly: ElementRef;
  @ViewChild('address', { read: ElementRef }) address : ElementRef;
  @ViewChild('landlordName',  { read: ElementRef }) landlordName : ElementRef;
  @ViewChild('landlordPhone',  { read: ElementRef }) landlordPhone: ElementRef;
  @ViewChild('addAccommodationBtn', {read: ElementRef}) addAccommodationBtn : ElementRef;

  constructor(private accommodationService : AccommodationService,
              private socialAuthService: SocialAuthService) { }

  ngOnInit() {
    this.accommodationAdded = false;
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      
      console.log('accommodation user', this.user);
    });
  }

  showConfirm() {
    this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes, I want to add Accommodation.');
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No, I do not want to add Accommodation.');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  getAccommodations(form: NgForm){
    if(!this.accommodationAdded){
      return;
    }
    this.accommodation.city = this.city.nativeElement.value;
    this.accommodation.rentalCategory = this.rentalCategory.nativeElement.value;
    this.accommodation.highestPrice = this.highestPrice.nativeElement.value.substring(0,10);
    this.accommodation.lowestPrice = this.lowestPrice.nativeElement.value;
    this.accommodation.bedrooms = this.bedrooms.nativeElement.value;
    this.accommodation.bathrooms = this.bathrooms.nativeElement.value.substring(0,10);
    this.accommodation.utilities = this.utilities.nativeElement.value;
    this.accommodation.parking = this.parking.nativeElement.value;
    this.accommodation.furnished = this.furnished.nativeElement.value.substring(0,10);
    this.accommodation.appliances = this.appliances.nativeElement.value;
    this.accommodation.petFriendly = this.petFriendly.nativeElement.value;
    console.log(this.accommodation)
    this.accommodationResponse = this.accommodationService.getAccommodationDetails(this.accommodation);
    
    console.log(this.accommodationResponse.length);
    console.log('in component', this.accommodationResponse);
  }

  addAccommodations(form: NgForm){
    this.accommodation.city = form.value.city;
    this.accommodation.rentalCategory = form.value.rentalCategory;
    this.accommodation.highestPrice = form.value.highestPrice;
    this.accommodation.lowestPrice = form.value.lowestPrice;
    this.accommodation.bedrooms = form.value.bedrooms;
    this.accommodation.bathrooms = form.value.bathrooms;
    this.accommodation.utilities = form.value.utilities;
    this.accommodation.parking = form.value.parking;
    this.accommodation.furnished = form.value.furnished;
    this.accommodation.appliances = form.value.appliances;
    this.accommodation.petFriendly = form.value.petFriendly;
    this.accommodation.address = form.value.address;
    this.accommodation.landlordName = form.value.landlordName;
    this.accommodation.landlordPhone = form.value.landlordPhone;
    console.log(this.accommodation);
    
    this.accommodationAdded = true;
    this.addAccommodationBtn.nativeElement.innerHTML= "Add Another Accommodation";
    console.log(this.addAccommodationBtn.nativeElement);
    this.accommodationService.addAccommodations(this.accommodation);
  }

}
