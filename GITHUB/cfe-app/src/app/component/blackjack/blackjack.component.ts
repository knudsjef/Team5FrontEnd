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
  lastRoundPlayer:String;
  lastRoundDealer:String;
  lastRound:String;

  
  constructor(private backendApiService: BackendApiService) { }

  async ngOnInit(): Promise<void> {
    this.playerID="player1";
    this.isTurn=false;
    await this.hostGame();
    // await this.setup();
    this.gameContainers=new Map<String,cardContainer>();
    this.gameContainers.set(this.playerID, emptyCardContainer());
    this.gameContainers.set("dealer", emptyCardContainer());
    this.lastRound="";
    this.lastRoundPlayer="";
    this.lastRoundDealer="";
  }

  async hostGame(){
    var dict={};
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("hostGame",dict).subscribe(async obj =>{
      console.log(obj);
      this.gameID=obj.blackjack;
      console.log("host",this.gameID);
      await this.setup();
    });
  }
  async setup(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="setup";
    dict["numPlayers"]=2;
    console.log(dict);
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log("setup",obj);
    });
  }
  async getGames(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="getGames";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  async deal(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="deal";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(async obj =>{
      console.log(obj);
      await this.updateHand();
    });
  }
  async hit(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="hit";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(async obj =>{
      console.log(obj);
      await this.updateHand();
    });
  }
  async stay(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="stay";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(async obj =>{
      console.log(obj);
      await this.checkTurn();
    });
  }
  async updateHand(){
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
  async updateAll(){
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

  async checkTurn(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="checkIfTurn";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      // console.log(obj);
      this.lastRoundDealer = "Dealer: " + obj["DealerScore"];
      this.lastRoundPlayer = "Player: " + obj["PlayerScore"];
      this.lastRound = obj["WinOrLose"];
      this.isTurn=obj.isTurn;
    });
  }
}
