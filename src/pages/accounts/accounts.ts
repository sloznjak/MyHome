import { Component } from '@angular/core';
import {NavController, ModalController, ToastController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {Account} from "../../model/Account";
import {AccountService} from "../../services/account.service";
import {AddAccountModal} from "../shared/modal/addAccount/addAccount";
import {AccountDetailsPage} from "./accountDetails/accountDetails";

/*
 Generated class for the Tasks page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-accounts',
    templateUrl: 'accounts.html'
})
export class AccountsPage {
    isLoading : boolean = false;
    toggleDelete: boolean = false;

    accounts: Account[] = [];

    constructor(public navCtrl: NavController, private modalCtrl: ModalController, private authService: AuthService, private accService: AccountService, private toastCtrl: ToastController) {
        this.loadAccounts();
    }

    ionViewDidLoad() {
        console.log('Hello TasksPage Page');
    }

    loadAccounts(){
        this.isLoading = true;
        this.accounts = [];

        this.accService.getAccountIdsForUser(this.authService.loggedInUser.id).subscribe(res => {
            let ids : number[] = [];
            console.log(res);
            res.forEach(re => {
                ids.push(re.accountId);
            });
            this.accService.getAccountsWithIds(ids).subscribe(accs => {
                console.log(accs);
                accs.forEach(acc => {
                    this.accounts.push(this.accService.parseObjToAccount(acc));
                });
                this.isLoading = false;
            });
        });
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

    addAccount(){
        let addAccountModal = this.modalCtrl.create(AddAccountModal, {userId: this.authService.loggedInUser.id});
        addAccountModal.onDidDismiss(acc => {
            if(acc){
                this.isLoading = true;
                let account: Account = this.accService.parseObjToAccount(acc);
                this.accounts.push(account);
                console.log(this.accounts);
                this.accService.accountsChanged.emit(this.accounts);
                this.isLoading = false;
            }
        });
        addAccountModal.present();
    }

    deleteAccount(account){
        this.isLoading = true;
        this.accService.deleteAccount(account).subscribe(() => {
            this.presentToast("Account \"" + account.name + "\" is removed!", "top");
            this.accounts.splice(this.accounts.indexOf(account), 1);
            this.accService.accountsChanged.emit(this.accounts);
            this.isLoading = false;
        });
    }

    accountDetails(acc){
        this.navCtrl.push(AccountDetailsPage, {
            account: acc
        });
    }
}
