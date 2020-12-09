import { Component, Input, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { promise } from 'protractor';
import { interval, Subscription } from 'rxjs';
import { card, makeCard } from 'src/app/models/card';
import { cardContainer, emptyCardContainer } from 'src/app/models/cardContainer';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent implements OnInit {
  @Input() playerID:String;
  @Input() gameID:number;
  isTurn:boolean;
  gameContainers:Map<String,cardContainer>;
  static instance: BlackjackComponent;

  finalPlayerScore:String;
  finalDealerScore:String;
  playerWinOrLose:String;
  otherPlayers:String[];
  roundActive:boolean;
  
  subscription: Subscription;
  source = interval(1000);
 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  constructor(private backendApiService: BackendApiService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    CardComponent.numOfCards = 0;
    this.gameID = Number(this.route.snapshot.paramMap.get('gameID'));
    this.playerID = this.route.snapshot.paramMap.get('playerID');
    this.isTurn=false;
    this.otherPlayers=[];
    this.gameContainers=new Map<String,cardContainer>();
    this.gameContainers.set(this.playerID, emptyCardContainer());
    this.gameContainers.set("dealer", emptyCardContainer());
    BlackjackComponent.instance = this;
    this.subscription = this.source.subscribe(val => this.checkTurn());
  }

  static GetInstance(): BlackjackComponent
  {
    return BlackjackComponent.instance;
  }
  async getGames(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="getGames";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      CardComponent.numOfCards = 0;
    });
  }
  async deal(){
    CardComponent.numOfCards = 0;
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="deal";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(async obj =>{
      CardComponent.numOfCards = 0;
      await this.checkTurn();
    });
  }
  async hit(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="hit";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(async obj =>{
      CardComponent.numOfCards = 0;
      await this.checkTurn();
    });
  }
  async stay(){
    console.log(this.gameID);
    console.log(this.gameContainers);
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="stay";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(async obj =>{
      CardComponent.numOfCards = 0;
      await this.checkTurn();
    });
  }
  async updateHand(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="getHand";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      CardComponent.numOfCards = 0;
      var temp:cardContainer=emptyCardContainer();
      for(var key in obj){
        temp.cards.push(makeCard(obj[key].cardNum));
      }
      this.gameContainers.set(this.playerID,temp);
    });
  }
  async updateAll(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="showCards";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(async obj =>{
      CardComponent.numOfCards = 0;
      this.otherPlayers=[];
      for(var key in obj){
        this.otherPlayers.push(key);
        var temp = emptyCardContainer();
        for(var cardKey in obj[key]){
         temp.cards.push(makeCard(obj[key][cardKey].cardNum)); 
        }
        CardComponent.numOfCards = 0;
        if(key!=this.playerID){
          this.gameContainers.set(key,temp);
        }
      }
      this.otherPlayers.splice(this.otherPlayers.lastIndexOf(this.playerID),1);
      this.otherPlayers.splice(this.otherPlayers.lastIndexOf("dealer"),1);
      await this.updateHand();
    });
  }

  async checkTurn(){
    var dict={};
    dict["gameID"]=this.gameID;
    dict["method"]="checkIfTurn";
    dict["hand"]=this.playerID;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(async obj =>{
      CardComponent.numOfCards = 0;
      this.roundActive=obj.roundActive=="true"?true:false;
      this.isTurn=obj.isTurn=="true"?true:false;
      this.finalPlayerScore = obj.PlayerScore;
      this.finalDealerScore = obj.DealerScore;
      this.playerWinOrLose = obj.WinOrLose;
      await this.updateAll();
    });
  }
}
