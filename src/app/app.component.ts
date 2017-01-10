import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {TasksPage} from "../pages/tasks/tasks";
import {AccountsPage} from "../pages/accounts/accounts";
import {ItemsPage} from "../pages/items/items";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    user = null;

    pages: Array<{title: string, component: any, icon: string}>;

    constructor(public platform: Platform, private authService: AuthService, private userService: UserService) {
        this.initializeApp();
        this.user =  JSON.parse(window.localStorage.getItem('userObject'));
        if(this.user){
            this.authService.loggedInUser = this.userService.parseObjToUser(this.user);
            this.rootPage = HomePage;
        }
        else{
            window.localStorage.clear();
            this.rootPage = LoginPage;
        }
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage, icon: 'fa fa-home' },
            { title: 'Tasks', component: TasksPage, icon: 'fa fa-tasks' },
            { title: 'Accounts', component: AccountsPage, icon: 'fa fa-dollar' },
            { title: 'Shopping list', component: ItemsPage, icon: 'fa fa-list' }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            setTimeout(function() {
                Splashscreen.hide();
            }, 100);
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if(page.title == 'Home'){
            this.nav.setRoot(page.component);
        }else{
            this.nav.push(page.component);
        }
    }

    logOut(){
        this.authService.logout();
        this.nav.setRoot(LoginPage);
    }
}
