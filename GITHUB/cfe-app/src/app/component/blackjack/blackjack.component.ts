import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { card, makeCard } from 'src/app/models/card';
import { cardContainer, emptyCardContainer } from 'src/app/models/cardContainer';
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
  static instance: BlackjackComponent;
  lastRoundPlayer:String;
  lastRoundDealer:String;
  lastRound:String;
  
  constructor(private backendApiService: BackendApiService) { }

  async ngOnInit(): Promise<void> {
    this.gameID=1;
    this.playerID="player1";  
    this.isTurn=false;
    await this.hostGame();
    this.setup();
    this.gameContainers=new Map<String,cardContainer>();
    this.gameContainers.set(this.playerID, emptyCardContainer());
    this.gameContainers.set("dealer", emptyCardContainer());
    this.gameContainers.get(this.playerID).cards.push(makeCard(36));
    console.log(this.gameContainers.get(this.playerID).cards);
    BlackjackComponent.instance = this;
  }

  static GetInstance(): BlackjackComponent
  {
    return BlackjackComponent.instance;
  }

  async hostGame(){
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
      var temp:cardContainer=emptyCardContainer();
      for(var key in obj){
        temp.cards.push(makeCard(obj[key].cardNum));
      }
      this.gameContainers.set(this.playerID,temp);
      console.log(this.gameContainers);
    });
  }
  updateAll(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="showCards";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
      for(var key in obj){
        var temp = emptyCardContainer();
        for(var cardKey in obj[key]){
         temp.cards.push(makeCard(obj[key][cardKey].cardNum)); 
        }
        this.gameContainers.set(key,temp);
      }
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
