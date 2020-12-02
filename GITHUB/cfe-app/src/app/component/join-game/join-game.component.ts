import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {


  currentGames:Map<number,String>
  playerID:number

  constructor(private backendApiService: BackendApiService) { }

  ngOnInit(): void {
    this.getGames()
  }
  async getGames(){
    var dict={};
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("getGames",dict).subscribe(obj =>{
      console.log(obj);
      this.currentGames = obj;
    });
  }
  async joinGame(gameID:number){
    var dict={};
    dict["gameID"]=gameID;
    this.backendApiService.backendRequest("joinGame",dict).subscribe(obj =>{
      console.log("join",obj);
      this.playerID=obj.playerID;
    });
  }
}
