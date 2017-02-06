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

  client:any;

  utils:any;

  constructor() {

    // Here we create an instance of the client
    // Since this Service is created once
    // we will not have to re-create other instances of the client.

    this.client = new Marketcloud.Client({
    	publicKey : '9c7ef560-5f8b-4d53-a12f-e9d9333a3cef'
    });

    this.utils = Marketcloud.Utils;

  }

}
