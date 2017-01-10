import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Page2 } from '../pages/page2/page2';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {UserService} from "../services/user.service";
import {SpinnerComponent} from "../pages/shared/spinner/spinner.component";
import {AuthService} from "../services/auth.service";
import {AddTaskModal} from "../pages/shared/modal/addTask/addTask";
import {TaskService} from "../services/task.service";
import {ArduinoPage} from "../pages/arduino/arduino";
import {ArduinoService} from "../services/arduino.service";
import {ColorPickerService} from "angular2-color-picker";
import {TasksPage} from "../pages/tasks/tasks";
import {AccountService} from "../services/account.service";
import {AddAccountModal} from "../pages/shared/modal/addAccount/addAccount";
import {AddToAccountModal} from "../pages/shared/modal/addToAccount/addToAccount";
import {RemoveFromAccountModal} from "../pages/shared/modal/removeFromAccount/removeFromAccount";
import {AccountsPage} from "../pages/accounts/accounts";
import {AccountDetailsPage} from "../pages/accounts/accountDetails/accountDetails";
import {ItemService} from "../services/item.service";
import {AddItemModal} from "../pages/shared/modal/addItem/addItem";
import {ItemsPage} from "../pages/items/items";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        Page2,
        SpinnerComponent,
        LoginPage,
        RegisterPage,
        AddTaskModal,
        AddAccountModal,
        AddItemModal,
        AddToAccountModal,
        RemoveFromAccountModal,
        ArduinoPage,
        TasksPage,
        AccountsPage,
        ItemsPage,
        AccountDetailsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        Page2,
        SpinnerComponent,
        LoginPage,
        RegisterPage,
        AddTaskModal,
        AddAccountModal,
        AddItemModal,
        AddToAccountModal,
        RemoveFromAccountModal,
        ArduinoPage,
        TasksPage,
        AccountsPage,
        ItemsPage,
        AccountDetailsPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UserService, AuthService, TaskService, AccountService, ItemService, ArduinoService, ColorPickerService]
})
export class AppModule {}
