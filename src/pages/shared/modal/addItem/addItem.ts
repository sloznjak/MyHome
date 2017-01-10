import {Component} from "@angular/core";
import {ViewController, NavParams, ToastController} from "ionic-angular";
import {AuthService} from "../../../../services/auth.service";
import {ItemService} from "../../../../services/item.service";

@Component({
    selector: 'my-add-item',
    templateUrl: 'addItem.html'
})
export class AddItemModal{
    name : string = "";
    isLoading : boolean = false;

    accountObj:any;

    constructor(public viewCtrl: ViewController, public params: NavParams, private toastCtrl: ToastController, private itemService: ItemService, private authService: AuthService){

    }

    dismiss() {
        this.viewCtrl.dismiss(null);
    }

    addItem(){
        if(this.name == ""){
            this.presentToast("Please enter all values...");
        }else{
            this.isLoading = true;
            let itmObj = {
                userId: this.params.get('userId'),
                name: this.name,
                date: new Date().valueOf,
                isDone: 0
            };

            this.itemService.setItem(itmObj).subscribe(item => {
                console.log(item);
                this.viewCtrl.dismiss(item);
                this.isLoading = false;
            }, err => console.log(err));
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
