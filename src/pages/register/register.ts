import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth.service";

/*
 Generated class for the Register page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    username: string = "";
    password: string = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    address: string = "";
    confirmPassword: string = "";
    phoneNumber: string = "";

    isLoading: boolean = false;

    constructor(private navCtrl: NavController, private toastCtrl: ToastController, private authService: AuthService) {}

    ionViewDidLoad() {
        console.log('Hello RegisterPage Page');
    }

    register(){
        this.isLoading = true;
        if( this.username != "" && this.password != "" && this.email != "" && this.firstName != "" && this.lastName != "" && this.address != "" && this.confirmPassword != "" && this.phoneNumber != ""){
            if(this.password == this.confirmPassword){
                let user = {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    address: this.address,
                    phoneNumber: this.phoneNumber
                };
                this.authService.register(user).subscribe(res => {
                    console.log(res);
                    if(res.success){
                        this.presentToast(res.msg, "bottom");
                        this.navCtrl.setRoot(LoginPage);
                    }else{
                        this.presentToast(res.msg, "top");
                    }
                });
                this.isLoading = false;

            }
            else{
                this.presentToast("Password doesn't match the confirm password", "top");
                this.isLoading = false;
            }

        }else{
            this.presentToast("Enter all values", "top");
            this.isLoading = false;
        }
    }

    presentToast(text, position) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: position
        });

        toast.onDidDismiss(() => {

        });

        toast.present();
    }

    cancle(){
        this.navCtrl.setRoot(LoginPage);
    }
}
