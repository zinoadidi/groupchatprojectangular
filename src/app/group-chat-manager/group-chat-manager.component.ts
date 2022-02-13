import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../models/chat.model';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-group-chat-manager',
  templateUrl: './group-chat-manager.component.html',
  styleUrls: ['./group-chat-manager.component.css']
})
export class GroupChatManagerComponent implements OnInit {

  user: User = new User();
  chats: Array<Chat> = [];
  constructor(private router: Router, public chatService: ChatService) { }

  ngOnInit(): void {

    try {
      //@ts-ignore
      this.user = JSON.parse(localStorage.getItem("user"));
      if(!this.user.userName) throw new Error("User underfined");
      this.setupLoadChatInterval();
    }catch(ex){
      alert("You must be loggedin to access this page")
      this.onLogout()
    }
  }

  setupLoadChatInterval() {
    this.loadChats();
    setInterval(()=> {
      console.log("Loading chats")
      this.loadChats()
    }, 180000)
  }

  onSendChat(chat: Chat){
    // use chat service to send chat to api
    // reload chat messages from api
    this.chatService.sendChatToAPI(chat)
    .then(async (response)=> {
        if(response.status === 201){
          this.loadChats();
        }else {
          throw new Error(await response.json())
        }
    }).catch(ex => {
      console.log(ex);
      alert(ex.message)
    })
  }

  loadChats(){
    this.chatService.getChatsFromAPI()
      .then(async (response) => {
        if (response.status === 200){
          this.chats = await response.json()
        }else {
          throw new Error(await response.text())
        }
      }).catch(ex => {
        console.log(ex)
        alert("Unable to load messages")
    })
  }

  onLogout(){
    localStorage.removeItem("user");
    this.router.navigate(['/']);
  }

}
