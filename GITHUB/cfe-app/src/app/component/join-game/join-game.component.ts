import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {


  currentGameIDs:number[];
  currentGamePlayerNums:number[];
  playerID:number

  constructor(private backendApiService: BackendApiService, private router: Router) { }

  ngOnInit(): void {
    this.getGames()
  }
  async getGames(){
    var dict={};
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("getGames",dict).subscribe(obj =>{
      this.currentGameIDs = Object.keys(obj).map(key=>Number(key));
      this.currentGamePlayerNums = Object.keys(obj).map(key=>Number(obj[key]));
    });
  }
  async joinGame(gameID:number){
    var dict={};
    dict["gameID"]=gameID;
    this.backendApiService.backendRequest("joinGame",dict).subscribe(obj =>{
      console.log("join",obj);
      this.playerID=obj.playerID;
      this.router.navigate(['/blackjack/' + gameID + '/' + this.playerID]);
    });
    
  }
}
