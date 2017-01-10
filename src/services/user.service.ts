import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {User} from "../model/User";

@Injectable()
export class UserService {
    private baseUrl : string = "http://192.168.1.31:8000/api";

    constructor(public http: Http){
    }

    getAllUsers(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true});

        return this.http.get(this.baseUrl + '/users', options)
            .map(res => res.json());
    }

    getUser(id: number){
        return this.http.get(this.baseUrl + '/user/' + id)
            .map(res => res.json());
    }

    parseObjToUser(obj) : User{
        // let accounts : Account[] = [];
        // let chatrooms : Chatroom[] = [];
        // let items: Item[] = [];
        // let tasks : Task[] = [];
        //
        // obj.accounts.forEach(acc => {
        //     let accountHistories : AccountHistory[] = [];
        //     // acc.accountHistory.forEach(accHistory => {
        //     //     let accountHistory = new AccountHistory(accHistory.id, accHistory.accountId, accHistory.data, accHistory.transaction);
        //     //     accountHistories.push(accountHistory);
        //     // });
        //     let account = new Account(acc.id, acc.name, acc.amount, accountHistories);
        //     accounts.push(account);
        // });
        //
        // obj.chatrooms.forEach(chat => {
        //     let messages : Message[] = [];
        //     chat.messages.forEach(msg => {
        //         let message = new Message(msg.id, msg.chatroomId, msg.textm, new Date(msg.date.toString()));
        //         messages.push(message);
        //     });
        //     let chatroom = new Chatroom(chat.id, chat.name, chat.userId, messages);
        //     chatrooms.push(chatroom);
        // });
        //
        // obj.items.forEach(itm => {
        //     let item = new Item(itm.id, itm.userId, itm.name, new Date(itm.date.toString()), itm.isDone);
        //     items.push(item);
        // });
        //
        // obj.tasks.forEach(tsk => {
        //     let task = new Task(tsk.id, tsk.userId, tsk.description, new Date(tsk.date.toString()), tsk.isDone);
        //     tasks.push(task);
        // });


        let user = new User(
            obj.id,
            obj.username,
            obj.password,
            obj.email,
            obj.firstName,
            obj.lastName,
            obj.address,
            obj.phoneNumber,
            // accounts,
            // chatrooms,
            // items,
            // tasks
        );
        return user;
    }
}
