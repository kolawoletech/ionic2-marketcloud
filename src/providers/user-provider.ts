import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {MarketcloudService} from './marketcloud-service';
import {StorageService} from './storage-service';
declare let marketcloud:any;
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  market:any;
  constructor(public marketProvider: MarketcloudService, public storage:StorageService) {
    console.log('Hello UserProvider Provider');
    this.market = this.marketProvider.getMarketCloud();
  }

  isLoggedIn() {
    let user = this.storage.getObject('user');
    if(user) {
      return true;
    } else return false;
  }
  
  createUser(user) {
    let promise = new Promise((resolve, reject) => {
      console.log(user);
      this.market.users.create(user, (err, user) => {
        if(user) {
          resolve(user);
        } else {
          reject(err);
        }
      })
    });
    return promise;
  }

  authUser(user) {
    let promise = new Promise((resolve, reject) => {
        this.market.users.authenticate(user.email, user.password, (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
      });
     return promise;
  }

  logout() {
    this.storage.remove('user');
    marketcloud.token = null;
    delete marketcloud.user;
  }

getCurrentUser() {
  let promise = new Promise((resolve, reject) => {
      this.market.users.getCurrent((err, user) => {
        if(user) {
          resolve(user);
        } else {
          console.log(err);
          reject(err);
        }
      })
    });
    return promise;
  }
  
 getAddress() {
   let promise = new Promise((resolve, reject) => {
      this.market.addresses.list({},(err, address) => {
        console.log(err,address)
        if(address) {
          resolve(address);
        } else {
          reject(err);
        }
      })
   });
   return promise;
 }
 
 createAddress(address) {
   let promise = new Promise((resolve, reject) => {
     this.market.addresses.create(address, (err, address) => {
       if(address) {
         resolve(address);
       } else {
         reject(err);
       }
     });
   })
   
   return promise;
 }
 

}
