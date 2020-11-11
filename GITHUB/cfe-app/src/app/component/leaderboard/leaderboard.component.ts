import { ArrayDataSource, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';

export interface Scores {
  name: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})

export class LeaderboardComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['Name', "Score"];

  constructor(private backendApiService: BackendApiService) {


  }
  

  
  ngOnInit(): void {
    var dict = {}
    dict["gameType"] = "BlackJack";
    this.backendApiService.backendRequest("getLeaderboard",dict).subscribe(obj =>{this.dataSource = obj.results}
      );

  }
  public getLeaderboard(gameName: String){
    var dict ={};
    dict["gameType"]=gameName;
    this.backendApiService.backendRequest("getLeaderboard",dict).subscribe(obj =>{this.dataSource = obj.results}
      );

  }
}

