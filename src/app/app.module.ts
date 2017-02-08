import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProductsPage } from '../pages/products/products';
import { CategoriesPage } from '../pages/categories/categories';
import { ItemPage } from '../pages/item/item';
import { CartPage } from '../pages/cart/cart';
import { AuthPage } from '../pages/auth/auth';
import { OrderPage } from '../pages/order/order';

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
    AuthPage
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
    AuthPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationService,
    MarketcloudService,
    UserService,
    StorageService,
    UtilService,
    CartService,
    Storage
  ]
})
export class AppModule {}
