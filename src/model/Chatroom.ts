import {Message} from "./Message";
export class Chatroom{
    private _id: number;
    private _name: string;
    private _userId: number;
    private _messages: Message[];

    constructor(id: number, name: string, userId: number, messages: Message[]) {
        this._id = id;
        this._name = name;
        this._userId = userId;
        this._messages = messages;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get messages(): Message[] {
        return this._messages;
    }

    set messages(value: Message[]) {
        this._messages = value;
    }
}
