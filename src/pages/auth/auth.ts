import { Component} from '@angular/core';
import {NavController, Events, ToastController } from 'ionic-angular';
import { UtilService } from '../../providers/util-service';
import { UserService } from '../../providers/user-service';
import { StorageService } from '../../providers/storage-service';
import { FormBuilder, Validators } from '@angular/forms';
import { validateEmail } from '../../validators/email';

/*
  Generated class for the Auth page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  auth:string;
  loginForm:any;
  regForm:any;
  constructor(public events:Events,
              public nav:NavController, 
              public form:FormBuilder, 
              public util:UtilService,
              public userService:UserService, 
              public storage: StorageService,
              public toastCtrl:ToastController) {
    
    this.auth = 'login';
    this.form = form;
    this.loginForm = form.group({
        email: ["",Validators.compose([Validators.required, validateEmail])],
        password:["",Validators.required]
    });
    
    this.regForm = form.group({
        name: ["", Validators.required],
        email: ["",Validators.compose([Validators.required, validateEmail])],
        password:["", Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }
  
  login(userData?) {
    // If User logins explicitly
    if(!userData) {
      userData = this.loginForm.value;
    } 

    this.userService.authUser(userData)
    .then((user)=> {
      this.storage.setObject('user', user);
      this.events.publish('user:logged_in');
      this.nav.pop();
    })
    .catch((error) => {
     // let message = error.message;
      //let toast = this.util.getToast(message);
     // this.nav.present(toast);
    });
  }
  
  register() {
    let user = this.regForm.value; 
    this.userService.createUser(user)
    .then(() => {
      delete user.name;
      this.login(user);
    });
  }

}
