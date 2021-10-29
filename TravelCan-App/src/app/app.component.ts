import { Component, OnInit } from '@angular/core';
import {  SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'TravelBuddy', url: 'travel-buddy', icon: 'airplane' },
    { title: 'Rideshare', url: 'ride-share', icon: 'car' },
    { title: 'Accommodation', url: 'accommodation', icon: 'home' },
    { title: 'Community', url: '/folder/Archived', icon: 'people' },
    { title: 'Testimonial', url: '/folder/Trash', icon: 'chatbubbles' },
    { title: 'ChatBot', url: '/folder/Spam', icon: 'chatbox-ellipses' }
  ];

  public labels = ['Help & FAQ'];
  
  isSignedIn:boolean;
  firstName : String;
  url:String;
  constructor( private socialAuthService: SocialAuthService, private router: Router) {
    
  }

  ngOnInit(){
    this.socialAuthService.authState.subscribe((user) => {
      //this.user = user;
      this.isSignedIn = (user != null);
      if(user != null){
      this.firstName = user.firstName;
      this.url = user.response.picture.data.url;
      }
      console.log(this.url);
      console.log('in app');
      console.log(user);
      //console.log(this.user);
    });
  }

  logOut(): void {
    console.log('log out method called!');
    this.socialAuthService.signOut();
    this.isSignedIn = false;
    this.router.navigate(['']);
  }

}
