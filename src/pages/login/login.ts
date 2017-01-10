import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {HomePage} from "../home/home";

/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    isLoading: boolean = false;

    username: string = "";
    password: string = "";

    constructor(private navCtrl: NavController, private navParams: NavParams, private userService: UserService, private authService: AuthService, private toastCtrl: ToastController) {
        // this.userService.getUser(1).subscribe(users => {
        //     console.log(users);
        // })
    }

    ionViewDidLoad() {
        console.log('Hello LoginPage Page');
    }

    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top',
        });

        toast.onDidDismiss(() => {

        });

        toast.present();
    }

    signIn(){
        this.isLoading = true;
        this.authService.authenticate(this.username, this.password)
            .subscribe(data => {
                if(data.success){
                    this.userService.getUser(data.id).subscribe(obj => {
                        console.log(obj);
                        let user = this.userService.parseObjToUser(obj);
                        console.log(user);
                        this.authService.storeUserCredentials(data.token, user, obj);
                    }, err => {}, () => {
                        this.isLoading = false;
                        this.navCtrl.setRoot(HomePage);
                    });
                }else if(!data.success){
                    this.presentToast(data.msg);
                    this.isLoading = false;
                }
            }, err => {
                this.presentToast("Unable to connecto to server");
                this.isLoading = false;
            });
    }

    register(){
        this.navCtrl.push(RegisterPage);
    }

    getInfo(){
        this.authService.getInfo().subscribe(res => {
            console.log(res);
        })
    }

}
