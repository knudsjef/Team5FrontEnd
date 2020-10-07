import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})

export class SandboxComponent implements OnInit {

  constructor() { }

  cards: any[] =
  [
    {
      type: "Diamonds",
      value: 1,
      fileName: '1.jpg'
    },
    {
      type: "Diamonds",
      value: 2,
      fileName: '2.jpg'
    },
    {
      type: "Diamonds",
      value: 3,
      fileName: '3.jpg'
    },
]

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>){
    
  }
}
