import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  constructor(private backendApiService: BackendApiService) { }

  ngOnInit(): void {
  }
  async getGames(){
    var dict={};
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("getGames",dict).subscribe(obj =>{
      console.log(obj);
    });
  }
}
