import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Component, ElementRef, Input, OnInit, TRANSLATIONS, ViewChild} from '@angular/core';
import { BlackjackComponent } from '../blackjack/blackjack.component';
import { SandboxComponent } from '../sandbox/sandbox.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('FlipCard',
    [
      state('NotFlipped', style({
        transform: 'rotateY(90deg)',
        position: 'absolute'
      })),
      state('Flipped', style({
        transform: 'rotateY(0deg)',
        position: 'absolute'
      })),
      transition('NotFlipped <=> Flipped',
      [
        animate('0.25s')
      ])
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() type: string;
  @Input() number: string;
  @Input() disabled: boolean;
  @Input() cardInstanceNumber: number;
  source: string;
  public static numOfCards: number = 0;
  xPos: number = 200;
  yPos: number;
  initialPosition;
  flipping: Boolean = false;
  isFlipped: Boolean = false;
  public lastClickedCard: boolean = false;

  constructor(private element: ElementRef) {
    this.initialPosition = this.element.nativeElement.getBoundingClientRect();
  }

  ngOnInit(): void {
    this.GetImageSource();
    CardComponent.numOfCards++;
    this.xPos += 200 * this.cardInstanceNumber;
  }

  //Changes the scss classes
  public ChangeClass(): void
  {
    SandboxComponent.GetInstance().ClearCardsClasses(this);
  }

  //Will get the current position in x and y coordinates of the card
  public GetPosition(event: CdkDragEnd): void
  {
    //this.xPos = event.source._dragRef.getFreeDragPosition().x;
    //this.yPos = event.source._dragRef.getFreeDragPosition().y;
    //console.log(this.xPos, this.yPos);
  }

  //Flips the card when double clicked
  FlipCardOnDoubleClick(){
    this.isFlipped = !this.isFlipped;
    //this.flipping = true;
    //setTimeout(() => 
    //{
      this.GetImageSource();
      //this.flipping = false;
    //}, 250);
  }

  //Determines the image source
 GetImageSource()
 {
    if (!this.isFlipped)
    {
      this.source = '../../../assets/Cards/' + this.type + '/' + (this.number=="-1"?"CardBack":this.number) + '.jpg';
    }
    else
    {
      this.source = '../../../assets/Cards/CardBack.jpg';
    }
 }

}
