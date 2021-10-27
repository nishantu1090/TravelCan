import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
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
  user: SocialUser;
  isSignedIn:boolean;
  
  constructor( user: SocialUser, private socialAuthService: SocialAuthService) {}

  ngOnInit(){
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedIn = (user != null);
      console.log(this.user);
    });
  }
}
