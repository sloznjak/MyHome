import {AccountHistory} from "./AccountHistory";
export class Account{
    private _id: number;
    private _name: string;
    private _amount: number;
    private _accountHistory: AccountHistory[];

    constructor(id: number, name: string, amount: number, accountHistory: AccountHistory[]) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._accountHistory = accountHistory;
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

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get accountHistory(): AccountHistory[] {
        return this._accountHistory;
    }

    set accountHistory(value: AccountHistory[]) {
        this._accountHistory = value;
    }
}
