import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



/*
  Generated class for the Delivery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare let google;

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html'
})
export class DeliveryPage {

  @ViewChild('map') mapElement;
  map : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.initMap();
  }
 
  initMap(){

    let latLng = new google.maps.LatLng(25.7479, 28.2293);

    let mapOptions = {
      center: latLng,
      zoom:15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
}
