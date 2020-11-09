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

  constructor(private backendApiService: BackendApiService) {


  }
  
   scores: Scores[] =
   [
     { name: 'Peter', score: 120 },
     { name: 'Richard', score: 110 },
     { name: 'Carter', score: 400},
     { name: 'Brenda', score: 300},
     { name: 'Sam', score: 350}
    
   ];
  
  dataSource = this.scores;
  displayedColumns: string[] = ['Name', "Score"];
  
  ngOnInit(): void {
    var dict={};
    dict["gameType"]="blackjack";
    this.backendApiService.backendRequest("getLeaderboard",dict).subscribe(obj =>{
      console.log(obj);
    });

    this.scores.sort(function(a,b){
      return b.score-a.score
    });
  }

}
