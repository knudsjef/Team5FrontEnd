import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  constructor(private backendApiService: BackendApiService) { }

  public ngOnInit() {
  }

  hostGame(){
    var dict={};
    dict["gameID"]=1;
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("hostGame",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  setup(){
    var dict={};
    dict["gameID"]=1;
    dict["method"]="setup";
    dict["numPlayers"]=1;
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  deal(){
    var dict={};
    dict["gameID"]=1;
    dict["method"]="deal";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  hit(){
    var dict={};
    dict["gameID"]=1;
    dict["method"]="hit";
    dict["hand"]="player1";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
  getHand1(){
    var dict={};
    dict["gameID"]=1;
    dict["method"]="getHand";
    dict["hand"]="player1";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    })
  }
}
