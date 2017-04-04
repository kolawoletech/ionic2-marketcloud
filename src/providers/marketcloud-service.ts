import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

declare var Marketcloud: any;

import '../../node_modules/marketcloud-js/dist/marketcloud.min';

/*
  Generated class for the MarketcloudService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MarketcloudService {

  market:any;

  client:any;

  utils:any;

  marketcloud : any;

  constructor() {

    // Here we create an instance of the client
    // Since this Service is created once
    // we will not have to re-create other instances of the client.

    this.client = new Marketcloud.Client({
    	publicKey : '78007c41-7f1c-454e-8b1f-600c96fa24ba'
    });


    //Create a new instance of the client
    this.marketcloud = new Marketcloud.Client({
      public_key : '78007c41-7f1c-454e-8b1f-600c96fa24ba'
    })

      //Authenticates a user given email and password
   
    this.utils = Marketcloud.Utils;

  }

  getMarketCloud() {
    return this.marketcloud;
  }

}
