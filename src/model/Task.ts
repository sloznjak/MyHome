export class Task{
    private _id:number;
    private _userId: number;
    private _description: string;
    private _date: Date;
    private _isDone: number;

    constructor(id: number, userId: number, description: string, date: Date, isDone: number) {
        this._id = id;
        this._userId = userId;
        this._description = description;
        this._date = date;
        this._isDone = isDone;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get isDone(): number {
        return this._isDone;
    }

    set isDone(value: number) {
        this._isDone = value;
    }
}
