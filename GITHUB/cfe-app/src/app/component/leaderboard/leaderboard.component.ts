import { ArrayDataSource, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})

export class LeaderboardComponent implements OnInit {
  /** Data Source for table */
  private dataSource;
  /** Columns to be displayed in table */
  displayedColumns: string[] = ['Name', "Score"];

  constructor(private backendApiService: BackendApiService) {

  }
  

  
  ngOnInit(): void {

      /**Make table load black jack leaderboard by default */
      var dict = {}
      dict["gameType"] = "BlackJack";
      this.backendApiService.backendRequest("getLeaderboard",dict).subscribe(obj =>{this.dataSource = obj.results}
      );

  }

  /**@description Makes request from server for specified game leaderboard */
  /**@param String Name of game that leaderboard is requested for */
  public getLeaderboard(gameName: String){
    var dict ={};
    dict["gameType"]=gameName;
    this.backendApiService.backendRequest("getLeaderboard",dict).subscribe(obj =>{this.dataSource = obj.results}
      );
  }

  /**@description Getter for table Data Source*/
  /**@returns Returns the table data source */
  public getDataSource(){

    return this.dataSource;
  }
}

