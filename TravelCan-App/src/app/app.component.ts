import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'TravelBuddy', url: 'travel-buddy', icon: 'airplane' },
    { title: 'Rideshare', url: 'ride-share', icon: 'car' },
    { title: 'Accommodation', url: 'accommodation', icon: 'home' },
    { title: 'Community', url: '/folder/Archived', icon: 'people' },
    { title: 'Testimonial', url: '/folder/Trash', icon: 'chatbubbles' },
    { title: 'ChatBot', url: '/folder/Spam', icon: 'chatbox-ellipses' }
  ];
  public labels = ['Help & FAQ'];
  constructor() {}
}
