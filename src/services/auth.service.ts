import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {User} from "../model/User";

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    loggedInUser : User;
    AuthToken = null;
    baseUrl = "http://192.168.1.31:8000";

    constructor(public http: Http){
        console.log("Authentication service instancieted");
    }

    storeUserCredentials(token, user, obj){
        this.isLoggedIn = true;
        this.loggedInUser = user;
        this.AuthToken = token;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userObject', JSON.stringify(obj));
    }

    destroyUserCredentials(){
        this.isLoggedIn = false;
        this.AuthToken = null;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userObject');
    }

    authenticate(username: string, password:string){
        let body = {
            username : username,
            password : password
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.baseUrl + '/authenticate', body, headers)
            .map(res => res.json());
    }

    register(user){
        let body = {
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.baseUrl + '/register', body, headers)
            .map(res => res.json());
    }

    logout(){
        this.destroyUserCredentials();
    }

    getInfo(){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.AuthToken);
        return this.http.get(this.baseUrl + '/getinfo', {headers: headers})
            .map(res => res.json());

    }

}
