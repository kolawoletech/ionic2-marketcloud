import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { EmailValidator } from  '../../validators/email2';

/*
  Generated class for the DeliveryForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-delivery-form',
  templateUrl: 'delivery-form.html'
})
export class DeliveryFormPage {

    @ViewChild('signupSlider') signupSlider: any;
 
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
 
    submitAttempt: boolean = false;
 
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

      this.slideOneForm = formBuilder.group({
          firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          email: ['', EmailValidator.isValid],
          phone: ['']
      });
  
      this.slideTwoForm = formBuilder.group({
          pickup: [''],
          destination: [''],
          time: [''],
          notes: ['']
      }); 
    

    }
 
    next(){
        this.signupSlider.slideNext();
    }
 
    prev(){
        this.signupSlider.slidePrev();
    }
 
    save(){
    
        this.submitAttempt = true;
    
        if(!this.slideOneForm.valid){
            this.signupSlider.slideTo(0);
        } 
        else if(!this.slideTwoForm.valid){
            this.signupSlider.slideTo(1);
        }
        else {
            console.log("success!")
            console.log(this.slideOneForm.value);
            console.log(this.slideTwoForm.value);
        }
    
    }
}
