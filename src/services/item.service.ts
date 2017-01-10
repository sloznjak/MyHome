import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Item} from "../model/Item";

@Injectable()
export class ItemService {
    shoppingListChanged = new EventEmitter<Item[]>();

    private baseUrl : string = "http://192.168.1.31:8000/api";

    constructor(public http: Http){
    }

    getItems(id : number){
        return this.http.get(this.baseUrl + '/items?userId=' + id)
            .map(res => res.json());
    }

    setItem(item){
        let body = item;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.baseUrl + '/items', body, headers)
            .map(res => res.json());
    }

    updateItem(item){
        let body = this.parseItemToObj(item);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        console.log(body);
        return this.http.put(this.baseUrl + '/item/' + item.id, body, headers)
            .map(res => res.json());
    }

    deleteItem(item){
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.delete(this.baseUrl + '/item/' + item.id, headers)
            .map(res => res.json());
    }

    parseObjToItem(obj): Item{
        return new Item(obj.id, obj.userId, obj.name, obj.date, obj.isDone);
    }

    parseItemToObj(item: Item): any{
        return {
            id: item.id,
            userId: item.userId,
            name: item.name,
            date: item.date,
            isDone: item.isDone
        }
    }
}
