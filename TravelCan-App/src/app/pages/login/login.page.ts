import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  form: FormGroup;
  

  constructor( private formBuilder: FormBuilder, private router: Router) { 

  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    
  }

  login(){
    this.router.navigate(['travel-buddy']);
  }
  
  register(){
    this.router.navigate(['register'])
  }
}
