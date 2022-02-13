import { User } from "./user.model";

export class Chat {

    id?: string;
    message?: string;
    sender?: User;
    roomId?: number;
    date?: string;

    constructor(message?: string, sender?: User, roomId?:number, date?:string, id?: string)  {
        this.date = date;
        this.message = message;
        this.sender = sender;
        this.id = id;
        this.roomId = roomId;
    } 
}
