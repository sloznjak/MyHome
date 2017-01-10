import {Component} from "@angular/core";
import {ViewController, NavParams, ToastController} from "ionic-angular";
import {AccountService} from "../../../../services/account.service";
import {AuthService} from "../../../../services/auth.service";
import {Account} from "../../../../model/Account";

@Component({
    selector: 'my-add-to-account',
    templateUrl: 'addToAccount.html'
})
export class AddToAccountModal{
    account : Account;
    name : string = "";
    description : string = "";
    amount : string = "";
    isLoading : boolean = false;

    constructor(public viewCtrl: ViewController, public params: NavParams, private toastCtrl: ToastController, private accountService: AccountService, private authService: AuthService){
        this.account = params.get('account');
        this.name = this.account.name;
    }

    dismiss() {
        this.viewCtrl.dismiss(null);
    }

    addToAccount(){
        if(this.description == "" && this.amount == ""){
            this.presentToast("Please enter all values...");
        }else{
            this.isLoading = true;
            let accHis = {
                accountId: this.account.id,
                description: this.description,
                date: new Date().valueOf(),
                transaction: this.amount
            };
            console.log(accHis);
            this.accountService.setAccountHistory(accHis).subscribe(res => {
                console.log(res);
                this.account.amount += +this.amount;
                this.viewCtrl.dismiss(this.account);
                this.isLoading = false;
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
