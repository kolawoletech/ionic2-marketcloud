import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder} from '@angular/forms'; 
import {validateEmail} from '../../validators/email';
import {CartService} from '../../providers/cart-service';
import {UserService} from '../../providers/user-service';
import {UtilService} from '../../providers/util-service';



@Component({
  templateUrl: 'order.html',
  selector: 'page-order'
})
export class OrderPage {
  address = {};
  items:Array<any>;
  addressForm:any;
  constructor(public nav:NavController, 
              public form: FormBuilder, 
              public cartService: CartService, 
              public params: NavParams, 
              public userService: UserService, 
              public util: UtilService) {
    this.items = params.get('items');    
    this.userService.getAddress()
    .then((address) => {
      this.address = address[0];
    }).catch((data)=> {
      console.log("No Address Added for User", data);
    });
    
    this.addressForm = form.group({
      full_name: ["", Validators.required],
      email: ["",Validators.compose([Validators.required, validateEmail])],
      country:["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      address1:["", Validators.required],
      postal_code:["", Validators.required]
    });    
  }
  
  processOrder() {
    let promise;
    let order_id;
    let nonce;
    console.log(this.address);
    console.log(this.items);
    if(this.address) {
      Object.keys(this.address).forEach(key => {
        if(this.address[key] == null) {
          delete this.address[key];
        }
      });
      promise = this.cartService.createOrder(this.items, this.address);
    } else {
      promise = this.userService.createAddress(this.addressForm.value)
      .then((address) => {
        return this.cartService.createOrder(this.items, address);
      });
    }
    
    promise.then((order) => {
      order_id = order.id;
      this.cartService.setCartID(null);
      console.log(this.addressForm.value);
      console.log(this.addressForm);
      return this.cartService.getPayment(order.total, this.addressForm.value.full_name);
    })
    .then((data) => {
      nonce = data.nonce;
      this.cartService.createPayment(order_id, nonce)
      .then(data => {
        // let toast = this.util.getToast('Order is successfull');
        console.log('Order is succesfull');
        //this.nav.pop(toast);
        this.address = {};
        this.nav.popToRoot();
      });
      
    });   
  }
}
