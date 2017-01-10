export class Message{
    private _id: number;
    private _chatroomId: number;
    private _text: string;
    private _date: Date;

    constructor(id: number, chatroomId: number, text: string, date: Date) {
        this._id = id;
        this._chatroomId = chatroomId;
        this._text = text;
        this._date = date;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get chatroomId(): number {
        return this._chatroomId;
    }

    set chatroomId(value: number) {
        this._chatroomId = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }
}
