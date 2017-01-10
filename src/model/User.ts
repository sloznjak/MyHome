import {Account} from "./Account";
import {Chatroom} from "./Chatroom";
import {Item} from "./Item";
import {Task} from "./Task";
export class User {
    private _id : number;
    private _username: string;
    private _password: string;
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    private _address: string;
    private _phonoeNumber: string;
    private _accounts: Account[];
    private _chatrooms: Chatroom[];
    private _items: Item[];
    private _tasks: Task[];

    constructor(id: number, username: string, password: string, email: string, firstName: string, lastName: string, address: string, phonoeNumber: string, accounts?: Account[], chatrooms?: Chatroom[], items?: Item[], tasks?: Task[]) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._address = address;
        this._phonoeNumber = phonoeNumber;
        this._accounts = accounts;
        this._chatrooms = chatrooms;
        this._items = items;
        this._tasks = tasks;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get phonoeNumber(): string {
        return this._phonoeNumber;
    }

    set phonoeNumber(value: string) {
        this._phonoeNumber = value;
    }

    get accounts(): Account[] {
        return this._accounts;
    }

    set accounts(value: Account[]) {
        this._accounts = value;
    }

    get chatrooms(): Chatroom[] {
        return this._chatrooms;
    }

    set chatrooms(value: Chatroom[]) {
        this._chatrooms = value;
    }

    get items(): Item[] {
        return this._items;
    }

    set items(value: Item[]) {
        this._items = value;
    }

    get tasks(): Task[] {
        return this._tasks;
    }

    set tasks(value: Task[]) {
        this._tasks = value;
    }
}
