import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {MarketcloudService} from './marketcloud-service';
import {StorageService} from './storage-service';
import 'rxjs/add/operator/map';

declare var BraintreePlugin: any;

@Injectable()
export class CartService {
  cartID:string;
  amount:string;
  items:Array<any>;
 
  
  market: any;
  constructor(public marketcloudService: MarketcloudService, public storage: StorageService, public http:Http) {
    this.market = this.marketcloudService.getMarketCloud();
    let local_cart_id = this.storage.get('cart_id');
    if(local_cart_id) {
      this.cartID = local_cart_id;
    }
  }

  setCartID(value) {
    console.log('set cart id', value);
    this.cartID = value;
    if(value) {
      this.storage.set('cart_id', value);
    } else {
      this.storage.remove('cart_id');
    }
  } 

  intializePayments() {
    let marketcloud_id = this.marketcloudService.getMarketCloud().publicKey;
    console.log(marketcloud_id + 'Happening here 1');
    // let headers = new Headers({'Authorization': marketcloud_id});
    let promise = new Promise((res, rej)=> {
      console.log(marketcloud_id + 'Happening here 2');
      console.log(this.market);
      this.market.payments.braintree.createClientToken((err, data) => {
        if(err) {
          console.log(err);
          console.log(this.market);
          rej(err);
        } else {
          let token = data.clientToken;
          console.log(token);
          console.log(data + ' thisintialise');
          console.log(BraintreePlugin);
          BraintreePlugin.initialize(token, () => res('done'), (error) => rej(error));
          console.log(data);
          res(data);
        }
      });
    });
    return promise;
  }
  
  addToCart(productID, quantity) {
    console.log(this.isCartExist());
    let promise = new Promise((resolve, reject) => {
      // if Cart not already exists
      if(!this.isCartExist()) {
        this.market.carts.create({
          items:[{'product_id' : productID, 'quantity': quantity}]
        }, (err, cart) => {
          if(err) {
            reject(err);
          } else {
            this.setCartID(cart.id);
            resolve(cart);
          }
        });
      } else {  // if Cart exists
          this.market.carts.add(this.cartID, [{'product_id' : productID, 'quantity': quantity}], (err, cart) => {
            if(err) {
              reject(err);
            } else {
              resolve(cart);
            }
          });
      }
    });
    
    return promise;
  }
  
  isCartExist() {
    if(this.cartID) {
      console.log(this.cartID);
      return true;
    } else {
      return false
    };
  }
  
  getCartContents() {
    let promise = new Promise((resolve, reject) => {
      console.log(this.cartID);
      if(this.cartID !== undefined) {
        this.market.carts.getById(this.cartID, function(err, cart) {
          if(cart) {
            resolve(cart);
          } else { 
            reject(err);
          }
       });
        
      } else {
        reject("no cart created yet");
      }
      
    });
    return promise;
  }
  
  updateCart(items){
    items = items.map((item) => {
        return {product_id: item.product_id, quantity: item.quantity};
    });
    let promise = new Promise((resolve, reject) => {
      this.market.carts.update(this.cartID, items, (error, cart) =>{
        if(cart) {
          resolve(cart);
        } else {
          reject(error);
        }
      })
    });
    
    return promise;
  }
  
  removeItem(item_id) {
    let promise = new Promise((resolve, reject) => {
      this.market.carts.remove(this.cartID,[{product_id: item_id}],(error, cart) =>{
        if(cart) {
          resolve(cart);
        } else {
          reject(error);
        }
      })
    });
    
    return promise;
  }
 
  createOrder(items, address) {
    
    items = items.map(function(item) {
      return {product_id:item.product_id, quantity: item.quantity};
    });

    
    let order = {
      shipping_address: address,
      billing_address: address,
      items: items
    };

    console.log(order);
    
    
    let promise = new Promise((resolve, reject) => {
      this.market.orders.create(order,(error, data) =>{
        if(data) {
          resolve(data);
        } else {
          reject(error);
        }
      })
    });
    
    console.log(promise);
    return promise;
  }

  getPayment(amount, user) {
    console.log(options  + "Here One");
    var options = {
      cancelText: "Cancel",
      title: "Purchase",
      ctaText: "Select Payment Method",
      amount: "R" + amount,
      primaryDescription: "Your Item",
      secondaryDescription :"Free shipping!"
    };
    console.log(promise);
    console.log(options + "Here Two");
    var promise = new Promise((res, rej) => {
      BraintreePlugin.presentDropInPaymentUI(options, function (result) {
        if (result.userCancelled) {
            rej('user cancelled');
        }
        else {
           console.log(result);
           res(result);
        }
      });
    });
    console.log(promise);
    return promise; 
  }

  createPayment(order_id, nonce) {
    let promise = new Promise((res, rej) => {
      this.market.payments.create({
        method: 'Braintree',
        order_id: order_id,
        nonce: nonce
      }, (err, result) => {
        if(err) {
          rej(err);
        } else {
          res(result);
          this.setCartID(undefined);
        }
      });
    });

    return promise;
  }
}
