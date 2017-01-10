import { Component } from '@angular/core';
import {NavController, ModalController, ToastController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {Item} from "../../model/Item";
import {ItemService} from "../../services/item.service";
import {AddItemModal} from "../shared/modal/addItem/addItem";

/*
 Generated class for the Tasks page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-items',
    templateUrl: 'items.html'
})
export class ItemsPage {
    isLoading : boolean = false;
    items: Item[] = [];

    constructor(public navCtrl: NavController, private modalCtrl: ModalController, private authService: AuthService, private itemService: ItemService, private toastCtrl: ToastController) {
        this.loadItems();
    }

    loadItems(){
        this.isLoading = true;
        this.items = [];

        this.itemService.getItems(this.authService.loggedInUser.id).subscribe(res => {
                res.forEach(re => {
                    this.items.push(this.itemService.parseObjToItem(re));
                });
                this.isLoading = false;
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

    addItem(){
        let addItemModal = this.modalCtrl.create(AddItemModal, {userId: this.authService.loggedInUser.id});
        addItemModal.onDidDismiss(itm => {
            if(itm){
                this.isLoading = true;
                let item: Item = this.itemService.parseObjToItem(itm);
                this.items.push(item);
                console.log(this.items);
                this.itemService.shoppingListChanged.emit(this.items);
                this.isLoading = false;
            }
        });
        addItemModal.present();
    }

    updateItem(item, listItem){
        item.close();
        if(listItem.isDone == 0){
            listItem.isDone = 1;
        }else{
            listItem.isDone = 0;
        }
        this.itemService.updateItem(listItem).subscribe(res =>{
            this.itemService.shoppingListChanged.emit(this.items);
        });
    }

    deleteItem(item, listItem){
        item.close();
        this.isLoading = true;
        this.itemService.deleteItem(listItem).subscribe(() => {
        }, err => console.log(err), () => {
            this.items.splice(this.items.indexOf(listItem), 1);
            this.isLoading = false;
        });
    }

    clearShoppingList(){
        this.items.forEach(item => {
            this.itemService.deleteItem(item).subscribe(res => {
                console.log(res);
            });
        });
        this.items = [];
        this.itemService.shoppingListChanged.emit(this.items);
    }
}
