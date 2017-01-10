export class AccountHistory{
    private _id: number;
    private _accountId: number;
    private _description: string;
    private _date : Date;
    private _transaction: number;

    constructor(id: number, accountId: number, description: string, date: Date, transaction: number) {
        this._id = id;
        this._accountId = accountId;
        this._description = description;
        this._date = date;
        this._transaction = transaction;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get accountId(): number {
        return this._accountId;
    }

    set accountId(value: number) {
        this._accountId = value;
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

    get transaction(): number {
        return this._transaction;
    }

    set transaction(value: number) {
        this._transaction = value;
    }
}
