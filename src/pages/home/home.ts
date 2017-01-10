import {Component} from '@angular/core';

import {NavController, ToastController, ModalController} from 'ionic-angular';
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";
import {AddTaskModal} from "../shared/modal/addTask/addTask";
import {TaskService} from "../../services/task.service";
import {Task} from "../../model/Task";
import {ArduinoPage} from "../arduino/arduino";
import {TasksPage} from "../tasks/tasks";
import {AddAccountModal} from "../shared/modal/addAccount/addAccount";
import {AccountService} from "../../services/account.service";
import {Account} from "../../model/Account";
import {AddToAccountModal} from "../shared/modal/addToAccount/addToAccount";
import {RemoveFromAccountModal} from "../shared/modal/removeFromAccount/removeFromAccount";
import {AccountsPage} from "../accounts/accounts";
import {ItemService} from "../../services/item.service";
import {Item} from "../../model/Item";
import {AddItemModal} from "../shared/modal/addItem/addItem";
import {ItemsPage} from "../items/items";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    isLoading: boolean = false;
    tasksLoading: boolean = false;
    accountsLoading: boolean = false;
    itemsLoading: boolean = false;

    user : User = null;
    tasksForToday : Task[] = [];
    accounts : Account[] = [];
    items : Item[] = [];
    date : Date = new Date();

    constructor(public navCtrl: NavController, public userService : UserService, public taskService: TaskService, private accountService: AccountService, public itemService: ItemService, public toastCtrl: ToastController, public modalCtrl: ModalController) {
        this.isLoading = true;
        this.tasksLoading = true;
        this.accountsLoading = true;
        this.itemsLoading = true;
        this.user =  JSON.parse(window.localStorage.getItem('userObject'));
        userService.getUser(this.user.id).subscribe(usr => {
            this.user = this.userService.parseObjToUser(usr);
            console.log(this.user);
        });

        this.date = new Date();
        setInterval(() => this.date = new Date(), 1000);

        this.taskService.tasksChanged.subscribe(tsks => {
           this.getUserTasks()
        });

        this.accountService.accountsChanged.subscribe(accs => {
           this.accounts = accs;
        });

        this.itemService.shoppingListChanged.subscribe(itms => {
            this.items = itms;
        });

        this.getUserTasks();
        this.getUserAccounts();
        this.getUserItems();
    }

    getUserTasks(){
        this.taskService.getTaskForUserOrderByDate(this.user.id).subscribe(tasksObj => {
            console.log(tasksObj);
            let newTasks: Task[] = [];
            tasksObj.forEach(taskObj => {
                let newTask = this.taskService.parseObjToTask(taskObj);
                if(newTask.date.getDate() == this.date.getDate()){
                    newTasks.push(newTask);
                }
                if(newTask.date.getDate() == this.date.getDate()+1 && newTask.date.getHours() == 0){
                    newTasks.push(newTask);
                }
            });
            this.tasksForToday = newTasks;
        }, err => {}, () => {
            this.tasksLoading = false;
            this.checkIfLoadingIsDone();
        });
    }

    getUserAccounts(){
        this.accountService.getAccountIdsForUser(this.user.id).subscribe(res => {
            let ids : number[] = [];
            console.log(res);
            res.forEach(re => {
                ids.push(re.accountId);
            });
            this.accountService.getAccountsWithIds(ids).subscribe(accs => {
                console.log(accs);
                accs.forEach(acc => {
                    this.accounts.push(this.accountService.parseObjToAccount(acc));
                });
                this.accountsLoading = false;
                this.checkIfLoadingIsDone();
            });
        });
    }

    getUserItems(){
        this.itemService.getItems(this.user.id).subscribe(res => {
            res.forEach(re => {
                this.items.push(this.itemService.parseObjToItem(re));
            });
            console.log(this.items);
            this.itemsLoading = false;
        }, err => console.log(err));
    }

    checkIfLoadingIsDone(){
        if(!this.tasksLoading && !this.accountsLoading && !this.itemsLoading){
            this.isLoading = false;
        }else{
            this.isLoading = true;
        }
    }

    addTask(){
        let addTaskModal = this.modalCtrl.create(AddTaskModal, {userId: this.user.id});
        addTaskModal.onDidDismiss(task => {
            if(task){
                this.tasksLoading = true;
                this.checkIfLoadingIsDone();
                this.taskService.getTaskForUserOrderByDate(this.user.id).subscribe(tasksObj => {
                    console.log(tasksObj);
                    let newTasks: Task[] = [];
                    tasksObj.forEach(taskObj => {
                        let newTask = this.taskService.parseObjToTask(taskObj);
                        if(newTask.date.getDate() == this.date.getDate()){
                            newTasks.push(newTask);
                        }
                        if(newTask.date.getDate() == this.date.getDate()+1 && newTask.date.getHours() == 0){
                            newTasks.push(newTask);
                        }
                    });
                    this.tasksForToday = newTasks;
                }, err => {}, () => {
                    this.tasksLoading = false;
                    this.checkIfLoadingIsDone();
                })
            }
        });
        addTaskModal.present();
    }

    updateTask(task){
        task.isDone = 1;
        this.taskService.updateTask(task).subscribe(() => {
        }, err => console.log(err), () => {
            this.presentToast("Task \"" + task.description + "\" is finished!", "bottom");
            this.tasksForToday.splice(this.tasksForToday.indexOf(task), 1);
        });
        console.log(task);
    }

    deleteTask(task){
        this.tasksLoading = true;
        this.checkIfLoadingIsDone();
        this.taskService.deleteTask(task).subscribe(() => {
        }, err => console.log(err), () => {
            this.presentToast("Task \"" + task.description + "\" is removed!", "top");
            this.tasksForToday.splice(this.tasksForToday.indexOf(task), 1);
            this.tasksLoading = false;
            this.checkIfLoadingIsDone();
        });
        console.log(task);
    }

    openArduino(){
        this.navCtrl.push(ArduinoPage);
    }

    openTasks(){
        this.navCtrl.push(TasksPage);
    }

    openAccounts(){
        this.navCtrl.push(AccountsPage);
    }

    openItems(){
        this.navCtrl.push(ItemsPage);
    }

    addAccount(){
        let addAccountModal = this.modalCtrl.create(AddAccountModal, {userId: this.user.id});
        addAccountModal.onDidDismiss(acc => {
            if(acc){
                this.accountsLoading = true;
                this.checkIfLoadingIsDone();
                let account: Account = this.accountService.parseObjToAccount(acc);
                this.accounts.push(account);
                console.log(this.accounts);
                this.accountsLoading = false;
                this.checkIfLoadingIsDone();
            }
        });
        addAccountModal.present();
    }

    addToAccount(account, item){
        item.close();
        let addToAccountModal = this.modalCtrl.create(AddToAccountModal, {account: account});
        addToAccountModal.onDidDismiss(acc => {
            if(acc){
                this.accountsLoading = true;
                this.checkIfLoadingIsDone();
                console.log(acc);
                this.accountService.updateAccount(acc).subscribe(res => {
                    console.log(res);
                    this.accounts.forEach(account => {
                        if(account.id == acc.id){
                            account.amount = acc.amount;
                        }
                    })
                }, err => console.log(err));
                this.accountsLoading = false;
                this.checkIfLoadingIsDone();
            }
        });
        addToAccountModal.present();
    }

    removeFromAccount(account, item){
        item.close();
        let removeFromAccountModal = this.modalCtrl.create(RemoveFromAccountModal, {account: account});
        removeFromAccountModal.onDidDismiss(acc => {
            if(acc){
                this.accountsLoading = true;
                this.checkIfLoadingIsDone();
                console.log(acc);
                this.accountService.updateAccount(acc).subscribe(res => {
                    console.log(res);
                    this.accounts.forEach(account => {
                        if(account.id == acc.id){
                            account.amount = acc.amount;
                        }
                    })
                }, err => console.log(err));
                this.accountsLoading = false;
                this.checkIfLoadingIsDone();
            }
        });
        removeFromAccountModal.present();
    }

    addItem(){
        let addItemModal = this.modalCtrl.create(AddItemModal, {userId: this.user.id});
        addItemModal.onDidDismiss(itm => {
            if(itm){
                this.itemsLoading = true;
                this.checkIfLoadingIsDone();
                let item: Item = this.itemService.parseObjToItem(itm);
                this.items.push(item);
                console.log(this.items);
                this.itemsLoading = false;
                this.checkIfLoadingIsDone();
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
           console.log(res);
        });
    }

    deleteItem(item, listItem){
        item.close();
        this.itemsLoading = true;
        this.checkIfLoadingIsDone();
        this.itemService.deleteItem(listItem).subscribe(() => {
        }, err => console.log(err), () => {
            this.presentToast("Item \"" + listItem.name + "\" is removed!", "top");
            this.items.splice(this.items.indexOf(listItem), 1);
            this.itemsLoading = false;
            this.checkIfLoadingIsDone();
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
}
