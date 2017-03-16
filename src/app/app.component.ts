import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Storage } from '@ionic/storage';



import { CartPage } from '../pages/cart/cart';
import { ProductsPage } from '../pages/products/products';
import { CategoriesPage } from '../pages/categories/categories';
import { PropertyListPage } from '../pages/property-list/property-list';
import { BrokerListPage } from '../pages/broker-list/broker-list';
import { FavoriteListPage } from '../pages/favorite-list/favorite-list';
import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';
import { DeliveryPage } from '../pages/delivery/delivery';


import {MarketcloudService} from '../providers/marketcloud-service';
import {ConfigurationService} from '../providers/configuration-service';
import {CartService} from '../providers/cart-service';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html',
  providers: [MarketcloudService, CartService],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CategoriesPage;

  // We will prefix our Storage values with a unique namespace
  // This is because if you have several apps built on this template
  // they might clash using different Marketcloud API keys.
  // 
  // With a namespace you can have any apps you want (as long as you have unique namespace)
  // so for example set this value to the app's name
  marketcloudAppNamespace: string = 'mcIonic2';

  pages: Array<{title: string, component: any}>;

 
  appMenuItems: Array<MenuItem>;

  helpMenuItems: Array<MenuItem>;
  

  constructor(public platform: Platform,
              private configuration: ConfigurationService,
              private cartService: CartService,
              private marketcloud: MarketcloudService,
              public storage: Storage,
              private alertCtrl: AlertController) {

    this.initializeApp();




    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // Object with references to pages
      this.pages = [
        { title: 'Categories', component: CategoriesPage },
        { title: 'Home', component: ProductsPage },
        { title: 'Cart', component: CartPage },
        { title: 'Real Estate', component: WelcomePage }
      ];


    this.appMenuItems = [
      {title: 'Properties', component: PropertyListPage, icon: 'home'},
      {title: 'Brokers', component: BrokerListPage, icon: 'people'},
      {title: 'Favorites', component: FavoriteListPage, icon: 'star'},
      {title: 'Delivery', component: DeliveryPage, icon: 'delivery'}
    ];

    this.helpMenuItems = [
      {title: 'Welcome', component: WelcomePage, icon: 'bookmark'},
      {title: 'About', component: AboutPage, icon: 'information-circle'},
    ];
      

      // Marketcloud
      // If we don't have a cart here, we create a cart and store the id into the 
      // local storage
      this.storage.get(this.marketcloudAppNamespace+'_cart_id')
      .then((value) => {

        if (value === null){
          // If value is null then we don't have a cart_id in the storage
 
          // Then we don't have a cart and we must create one
          this.cartService.intializePayments();
          this.marketcloud.client.carts.create({})
          .then((response) => {
            
            // The cart was successfully created and returned by Marketcloud
            // We immediatly store the id in the device's storage.
            this.storage.set(this.marketcloudAppNamespace+'_cart_id',response.data.id)
            .then(() => {

              // Cart id successfully written on the Storage
              this.configuration.set('cart_id',response.data.id);

            })
          })
          .catch((error) => {
            //An error has occurred, since we were not able to create the cart
            // we show the error to the user. This is were we might want to create
            // a retry mechanism.

            let alert = this.alertCtrl.create({
              title: 'Oops',
              subTitle: 'Unable to load categories, please check your internet connection.',
              buttons: ['Ok']
            });

            alert.present();
            
          })
        } else {
          console.info("Using cart with id "+value);
          this.cartService.intializePayments();
          this.configuration.set('cart_id',value);
        }
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
