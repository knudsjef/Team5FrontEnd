import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CardComponent } from '../card/card.component';
import { element } from 'protractor';
import { cardContainer } from 'src/app/models/cardContainer';
import { makeCard } from 'src/app/models/card';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})

export class SandboxComponent implements OnInit {

  public cardComponents: CardComponent[] = [];
  private static instance: SandboxComponent;
  constructor() {
    if (SandboxComponent.instance == null)
    {
      SandboxComponent.instance = this;
    }
   }

  cards:cardContainer = new cardContainer;

  ngOnInit(): void {
    this.cards.cards=[makeCard(1),makeCard(2),makeCard(3)];
  }

  public ClearCardsClasses(cardToSetTrue: CardComponent): void
  {
    for (var i = 0; i < this.cardComponents.length; i++)
    {
      this.cardComponents[i].lastClickedCard = false;
    }
    cardToSetTrue.lastClickedCard = true;
  }

  public static GetInstance(): SandboxComponent
  {
    return SandboxComponent.instance;
  }

  public AddCard(cardType: string, cardValue: string, cardFileName: string)
  {
    this.cards.push({
      type: cardType, 
      value: cardValue,
      fileName: cardFileName
  });
  }

}
