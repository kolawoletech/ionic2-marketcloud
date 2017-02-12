import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams,AlertController  } from 'ionic-angular';
import { MarketcloudService } from '../../providers/marketcloud-service'; 
import {AuthPage} from '../../pages/auth/auth';
import {OrderPage} from '../../pages/order/order';
import {ConfigurationService} from '../../providers/configuration-service';
import {UserService} from '../../providers/user-service';
/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public cart:any = { items:[]};
	public items:Array<any>;
  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
					public userService: UserService,
  				public alertCtrl: AlertController,
  				public configuration: ConfigurationService,
  				public marketcloud: MarketcloudService) {
  	


  }

  ionViewDidLoad() {

    this.marketcloud.client.carts.getById(this.configuration.get('cart_id'))
    .then((response) => {
    	this.cart = response.data;
    })
    .catch((error) =>{
    	let alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'An error has occurred, unable to load the cart.',
          buttons: ['Ok']
        });

        alert.present();
    })

  }

  private updateQuantity(index,amount){
  	let promise:any;
  	if (this.cart.items[index].quantity + amount > 0) {
  		promise = this.marketcloud.client.carts.update(
  			this.configuration.get('cart_id'),
	  			[{
	  				product_id 	: this.cart.items[index].product_id,
	  				quantity 	: this.cart.items[index].quantity + amount,
	  				variant_id  : this.cart.items[index].variant_id || 0
	  	}])
  	} else if (this.cart.items[index].quantity + amount === 0) {
  		promise = this.marketcloud.client.carts.remove(
  			this.configuration.get('cart_id'),
	  			[{
	  				product_id 	: this.cart.items[index].product_id,
	  				variant_id  : this.cart.items[index].variant_id || 0
	  		}])
  	} else {

  		return;
  	}
  	promise
  	.then((response) => {
  		this.cart = response.data;
  	})
  	.catch((error) => {
  		
  		let alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'An error has occurred, cart not updated',
          buttons: ['Ok']
        });

        alert.present();
  	})
  }

  increaseQuantity(index) {
  	return this.updateQuantity(index,1);
  }

  decreaseQuantity(index) {
  	return this.updateQuantity(index,-1);
  }

  getCartTotal() {
  	if (this.cart.items.length === 0)
  		return 0;

  	return this.cart.items.map((item) => {
  		if (item.price_discount) 
  			return item.quantity*item.price_discount;
  		else
  			return item.quantity*item.price;
  	}).reduce((a,b) => {
  		return a+b;
  	});
  }

  proceedToCheckout(){
	if(this.userService.isLoggedIn()) {
		
		console.log(this.cart.items);
     this.navCtrl.push(OrderPage, {items: this.cart.items});
   } else {
     this.navCtrl.push(AuthPage);
   }
  }

}
