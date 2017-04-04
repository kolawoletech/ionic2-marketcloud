import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProductsPage } from '../pages/products/products';
import { CategoriesPage } from '../pages/categories/categories';
import { ItemPage } from '../pages/item/item';
import { CartPage } from '../pages/cart/cart';
import { AuthPage } from '../pages/auth/auth';
import { OrderPage } from '../pages/order/order';

//Deivery Pages
import {ModalAutocompleteItems} from '../pages/delivery/delivery';
import { PageGmapAutocomplete } from '../pages/page-gmap-autocomplete/page-gmap-autocomplete';

// Delivery Providers
//import {DeliveryService} from '../providers/delivery-service';


//Real Estate Pages
import {WelcomePage} from '../pages/welcome/welcome';
import {PropertyListPage} from '../pages/property-list/property-list';
import {PropertyDetailPage} from '../pages/property-detail/property-detail';
import {BrokerListPage} from '../pages/broker-list/broker-list';
import {BrokerDetailPage} from '../pages/broker-detail/broker-detail';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {AboutPage} from '../pages/about/about';

//Real Estate Providers
import { PropertyService } from "../providers/property-service-mock";
import { BrokerService } from "../providers/broker-service-mock";

import { MarketcloudService } from '../providers/marketcloud-service';
import { ConfigurationService } from '../providers/configuration-service';
import { StorageService } from '../providers/storage-service';
import { UserService } from '../providers/user-service';
import { UtilService } from '../providers/util-service';
import { CartService } from '../providers/cart-service';

import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    ProductsPage,
    CategoriesPage,
    ItemPage,
    CartPage,
    OrderPage,
    AuthPage,
    WelcomePage,
    AboutPage,
    PropertyListPage,
    PropertyDetailPage,
    FavoriteListPage,
    BrokerListPage,
    BrokerDetailPage,
    ModalAutocompleteItems,
    PageGmapAutocomplete
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoriesPage,
    ProductsPage,
    ItemPage,
    CartPage,
    OrderPage,
    AuthPage,
    WelcomePage,
    AboutPage,
    PropertyListPage,
    PropertyDetailPage,
    FavoriteListPage,
    BrokerListPage,
    BrokerDetailPage,
    ModalAutocompleteItems,
    PageGmapAutocomplete
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationService,
    MarketcloudService,
    UserService,
    StorageService,
    UtilService,
    CartService,
    Storage,
    PropertyService,
    BrokerService
  ]
})
export class AppModule {}
