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
  
  accommodationDetails: AccommodationDetails[];
  accommodationResponse: AccommodationResponse[];
  filteredAccommodations : AccommodationDetails[] = [];
  results: Observable<any>;
  getAccommodation : Boolean;
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

  constructor(private accommodationService : AccommodationService,
              private socialAuthService: SocialAuthService) { }

  ngOnInit() {
    this.getAccommodation = false;
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      
      console.log('accommodation user', this.user);
    });
  }

  getAccommodations(form: NgForm){
    console.log('searching for city', this.city.nativeElement.value);
    console.log('searching for rental category', this.rentalCategory.nativeElement.value);
    console.log('searching for highestPrice', this.highestPrice.nativeElement.value);
    console.log('searching for lowestPrice', this.lowestPrice.nativeElement.value);
    console.log('searching for bedrooms', this.bedrooms.nativeElement.value);
    console.log('searching for bathrooms', this.bathrooms.nativeElement.value);
    console.log('searching for utilities', this.utilities.nativeElement.value);
    console.log('searching for parking', this.parking.nativeElement.value);
    console.log('searching for furnished', this.furnished.nativeElement.value);
    console.log('searching for appliances', this.appliances.nativeElement.value);
    console.log('searching for petFriendly', this.petFriendly.nativeElement.value);

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
    this.accommodationResponse = this.accommodationService.getAccommodationDetails(this.accommodation);
    
    console.log(this.accommodationResponse.length);
    console.log('in component', this.accommodationResponse);
  }

}
