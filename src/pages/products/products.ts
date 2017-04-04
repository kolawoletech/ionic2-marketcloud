import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MarketcloudService } from '../../providers/marketcloud-service'; 
import { ItemPage } from '../item/item';

/*
  Generated class for the Products page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  providers: [],
  entryComponents: [ItemPage],
  animations: [
 
    trigger('flip', [
      state('flipped', style({
        transform: 'rotate(180deg)',
        backgroundColor: '#f50e80'
      })),
      transition('* => flipped', animate('400ms ease'))
    ]),
 
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(150%, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-out'))
    ]),
 
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('200ms linear'))
    ]),
 
    trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('300ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ])
 
  ]
})
export class ProductsPage {

  products:Array<any>;
  
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private marketcloud: MarketcloudService, 
      private alertCtrl: AlertController) {


  	var promise:any;
  	if (this.navParams.get('query')){
  		promise = marketcloud.client.products.list(this.navParams.get('query'));
  	} else {
  		promise = marketcloud.client.products.list();
  	}

    promise
    .then((response) => {
    	this.products = response.data;
    })
    .catch((error) => {
    	let alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'Unable to load products, please check your internet connection.',
          buttons: ['Ok']
        });

        alert.present();
    })
  }

  viewItemDetails(product){
  	// Showing single product details
  	this.navCtrl.push(ItemPage,{
  		product : product
  	})
  }

  

}
