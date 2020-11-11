import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CardComponent } from '../card/card.component';
import { element } from 'protractor';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})

export class SandboxComponent implements OnInit {

  public cardComponents: CardComponent[] = [];
  private static instance: SandboxComponent; //singleton
  constructor() {
    //sets the singleton
    if (SandboxComponent.instance == null)
    {
      SandboxComponent.instance = this;
    }
   }

  cards: any[] =
  [
    {
      type: "Diamonds",
      value: "1",
      fileName: '1.jpg'
    },
    {
      type: "Diamonds",
      value: "2",
      fileName: '2.jpg'
    },
    {
      type: "Diamonds",
      value: "3",
      fileName: '3.jpg'
    }
  ];

  ngOnInit(): void {
  }

  //Places card in front
  public ClearCardsClasses(cardToSetTrue: CardComponent): void
  {
    for (var i = 0; i < this.cardComponents.length; i++)
    {
      this.cardComponents[i].lastClickedCard = false;
    }
    cardToSetTrue.lastClickedCard = true;
  }

  //gets the singleton
  public static GetInstance(): SandboxComponent
  {
    return SandboxComponent.instance;
  }

  //Adds a card to the cards
  public AddCard(cardType: string, cardValue: string, cardFileName: string)
  {
    this.cards.push({
      type: cardType, 
      value: cardValue,
      fileName: cardFileName
  });
  }

}
