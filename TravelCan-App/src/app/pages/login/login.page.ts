import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginPageForm } from './login.page.form';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  form: FormGroup;
  user: SocialUser;
  isSignedin: boolean = null;

  constructor( private formBuilder: FormBuilder, 
               private router: Router,
               private socialAuthService: SocialAuthService) { 

  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(this.user);
    });
    
  }

  login(){
    this.router.navigate(['dashboard']);
  }
  
  register(){
    this.router.navigate(['register'])
  }

  facebookSignin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    
    //if(this.user!=null){
      this.router.navigate(['dashboard']);
    //}
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

}
