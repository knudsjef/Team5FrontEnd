import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public isHost:Boolean=false;
  constructor() {
   }

  // const app = require('express')();
  // const http = require('http').Server(this.app);
  // const io = require('socket.io')(this.http);

  // io.on('connection', socket => {
  //   let previousId;
  //   const safeJoin = currentId => {
  //       socket.leave(previousId);
  //       socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
  //       previousId = currentId;
  //   }
  // });


  // //Event Listeners
  //  socket.on(joinGame(id:string){

  //  }

  //  leaveGame(id:string){

  //  }

  //  testComms(message:string){
  //   alert(message);
  //  }


}
