import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CardComponent } from '../card/card.component';
import { element } from 'protractor';
import { cardContainer } from 'src/app/models/cardContainer';
import { card,makeCard,makeCardFromVals } from 'src/app/models/card';

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

  cards:cardContainer = new cardContainer;

  ngOnInit(): void {
    CardComponent.numOfCards = 0;
    this.cards.cards=[makeCard(1),makeCard(2),makeCard(3)];
    CardComponent.numOfCards = 0;
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
    this.cards.cards.push(makeCardFromVals(cardType,cardValue));
  }

}
