import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {
  backendApiService: any;

  constructor() { }

  ngOnInit(): void {
  }
  async getGames(){
    var dict={};
    dict["gameID"]=0;
    dict["method"]="getGames";
    this.backendApiService.backendRequest("blackjack",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
}
