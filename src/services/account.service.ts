import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Account} from "../model/Account";
import {AccountHistory} from "../model/AccountHistory";

@Injectable()
export class AccountService {
    accountsChanged = new EventEmitter<Account[]>();

    private baseUrl : string = "http://192.168.1.31:8000/api";

    constructor(public http: Http){
    }

    setAccount(account){
        let body = account;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.baseUrl + '/accounts', body, headers)
            .map(res => res.json());
    }

    setAccountHistory(accHist){
        let body = accHist;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.baseUrl + '/accountHistories', body, headers)
            .map(res => res.json());
    }

    setUserAccount(userAcc){
        let body = userAcc;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.baseUrl + '/userAccounts', body, headers)
            .map(res => res.json());
    }

    updateAccount(account){
        let body = this.parseAccountToObj(account);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.put(this.baseUrl + '/account/' + account.id, body, headers)
            .map(res => res.json());
    }

    deleteAccount(account){
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.delete(this.baseUrl + '/account/' + account.id, headers)
            .map(res => res.json());
    }

    getAccountIdsForUser(id: number){
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.get(this.baseUrl + '/userAccounts/?userId=' + id, headers)
            .map(res => res.json());
    }

    getAccountHistoriesForAcocunt(account){
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.get(this.baseUrl + '/accountHistories/?accountId=' + account.id, headers)
            .map(res => res.json());
    }

    getAccountsWithIds(ids: number[]){
        console.log(ids);
        let addUrl :string = "";
        ids.forEach(id => {
            if(ids.indexOf(id) == 0){
                addUrl += "?id=" + id.toString();
            }else {
                addUrl += "&id=" + id.toString();
            }
        });

        console.log(addUrl);

        //   ?id=1&id=2
        return this.http.get(this.baseUrl + '/accounts/' + addUrl)
            .map(res => res.json());
    }

    parseObjToAccount(obj): Account{
        let accHistory :AccountHistory[] = [];

        obj.account_histories.forEach(accHist => {
            accHistory.push(this.parseObjToAccHistory(accHist));
        });

        return new Account(obj.id, obj.name, obj.amount, accHistory);
    }

    parseObjToAccHistory(obj): AccountHistory{
        return new AccountHistory(obj.id, obj.accountId, obj.description, obj.date, obj.transaction)
    }

    parseAccountToObj(account: Account): any{
        return {
            id: account.id,
            name: account.name,
            amount: account.amount
        }
    }
}
