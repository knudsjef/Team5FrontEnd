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
    this.isTurn=false;
    await this.hostGame();
    this.gameContainers=new Map<String,cardContainer>();
    this.gameContainers.set(this.playerID, emptyCardContainer());
    this.gameContainers.set("dealer", emptyCardContainer());
    BlackjackComponent.instance = this;
  }

  static GetInstance(): BlackjackComponent
  {
    return BlackjackComponent.instance;
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
    console.log(dict);
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log("setup",obj);
    });
  }
  async joinGame(){
    var dict={};
    dict["gameID"]=this.gameID;
    this.backendApiService.backendRequest("joinGame",dict).subscribe(obj =>{
      console.log("join",obj);
      this.playerID=obj.playerID;
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
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  async hit(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="hit";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  async stay(){
    console.log(this.gameID);
    console.log(this.gameContainers);
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="stay";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
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
      console.log(obj);
      this.isTurn=obj.isTurn;
    });
  }
}
