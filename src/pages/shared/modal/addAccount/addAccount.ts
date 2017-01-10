import {Component} from "@angular/core";
import {ViewController, NavParams, ToastController} from "ionic-angular";
import {AccountService} from "../../../../services/account.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
    selector: 'my-add-account',
    templateUrl: 'addAccount.html'
})
export class AddAccountModal{
    name : string = "";
    amount : string = "";
    isLoading : boolean = false;

    accountObj:any;

    constructor(public viewCtrl: ViewController, public params: NavParams, private toastCtrl: ToastController, private accountService: AccountService, private authService: AuthService){

    }

    dismiss() {
        this.viewCtrl.dismiss(null);
    }

    addAccount(){
        if(this.name == "" && this.amount == ""){
            this.presentToast("Please enter all values...");
        }else{
            this.isLoading = true;
            let acc = {
                name: this.name,
                amount: this.amount
            };

            this.accountService.setAccount(acc).subscribe(res => {
                this.accountObj = res;
            }, err => console.log(err), ()=>{
                let userAcc = {
                    userId : this.authService.loggedInUser.id,
                    accountId : this.accountObj.id
                };
                this.accountService.setUserAccount(userAcc).subscribe(res => {
                    console.log(res);
                    this.viewCtrl.dismiss(this.accountObj);
                    this.isLoading = false;
                });
            });
        }
    }

    cancle(){
        this.viewCtrl.dismiss(null);
    }

    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });

        toast.onDidDismiss(() => {

        });

        toast.present();
    }
}
