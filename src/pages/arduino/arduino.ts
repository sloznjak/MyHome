import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ColorPickerService} from "angular2-color-picker";
/*
 Generated class for the Tasks page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-arduino',
    templateUrl: 'arduino.html'
})
export class ArduinoPage {
    color: string = "#127bdc";

    constructor(public navCtrl: NavController, public cpService: ColorPickerService) {}

    ionViewDidLoad() {
        console.log('Hello Arduino Page');
    }

}
