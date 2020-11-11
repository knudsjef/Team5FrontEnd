import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { card, makeCard } from 'src/app/models/card';
import { cardContainer } from 'src/app/models/cardContainer';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent implements OnInit {

  playerID:String;
  gameID:number;
  isTurn:boolean;
  gameContainers:Map<String,cardContainer>;

  
  constructor(private backendApiService: BackendApiService) { }

  ngOnInit(): void {
    this.gameID=1;
    this.playerID="player1";  
    this.isTurn=false;
    this.hostGame();
    this.gameContainers=new Map<String,cardContainer>();
    this.gameContainers.set(this.playerID, new cardContainer());
    this.gameContainers.set("dealer", new cardContainer());
  }

  hostGame(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("hostGame",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  setup(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="setup";
    dict["numPlayers"]=1;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  deal(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="deal";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  hit(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="hit";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  stay(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="stay";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  updateHand(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="getHand";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
      this.gameContainers.set(this.playerID,new cardContainer())
      var temp:cardContainer=this.gameContainers.get(this.playerID);
      for(var i = 0;i<obj.length;i++){
        temp.cards.push(makeCard(obj[i].cardNum));
      }
      console.log(temp);
      console.log("gamecontainers",this.gameContainers);
    });
  }
  updateAll(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="showCards";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }

  checkTurn(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="checkIfTurn";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
      this.isTurn=obj.isTurn;
    });
  }
}
