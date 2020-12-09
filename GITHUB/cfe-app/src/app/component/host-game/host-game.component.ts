import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { Router } from '@angular/router';
import * as $ from 'jQuery';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game.component.html',
  styleUrls: ['./host-game.component.scss']
})

export class HostGameComponent implements OnInit {
  gameID: number;
  playerID: number;
  currentGamePlayerNums:number[];

  subscription: Subscription;
  source = interval(1000);
  
  constructor(private backendApiService: BackendApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.hostGame();
    this.subscription = this.source.subscribe(val => this.getGames());
 }

  async hostGame(){
    var dict={};
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("hostGame",dict).subscribe(async obj =>{
      console.log(obj);
      this.gameID = obj.blackjack;
      await this.joinGame();
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
    this.router.navigate(['/blackjack/' + this.gameID + '/' + this.playerID]);
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
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("getGames",dict).subscribe(obj =>{
      this.currentGamePlayerNums = Object.keys(obj).map(key=>Number(obj[key]));
    });
  }
}
