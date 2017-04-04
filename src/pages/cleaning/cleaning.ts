import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Cleaning page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cleaning',
  templateUrl: 'cleaning.html'
})
export class CleaningPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  todo = {
    title: '',
    description: ''
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad CleaningPage');
  }

}
