import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl: string = "https://crudcrud.com/api/d46a94aa05074b7dbe755afba49d9813";
  sendChatEndpoint:string = "/chats";
  getChatEndpoint:string = "/chats";
  allHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  constructor() { }

  sendChatToAPI(chat: Chat): Promise<Response> {
    return fetch(
      this.apiUrl + this.sendChatEndpoint,
      {
        method: 'POST',
        headers: this.allHeaders,
        body: JSON.stringify(chat)
      }
    )
  }

  getChatsFromAPI(): Promise<Response> {
    return fetch(
      this.apiUrl + this.getChatEndpoint,
      {
        method: 'GET',
        headers: this.allHeaders
      }
    )
  }
}
