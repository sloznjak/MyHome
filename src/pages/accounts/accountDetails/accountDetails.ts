import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {AccountService} from "../../../services/account.service";
import {Account} from "../../../model/Account";
import {AccountHistory} from "../../../model/AccountHistory";

@Component({
    selector: 'page-account-details',
    templateUrl: 'accountDetails.html'
})
export class AccountDetailsPage{
    account: Account;
    accHistories : AccountHistory[] = [];
    isLoading: boolean = false;

    constructor(public navCtrl: NavController, private params: NavParams, private accService: AccountService,){
        this.isLoading = true;
        this.account = params.get('account');

        this.accService.getAccountHistoriesForAcocunt(this.account).subscribe(res => {
            res.forEach(re => {
                this.accHistories.push(this.accService.parseObjToAccHistory(re));
            });
            console.log(this.accHistories);
        })
    }
}
