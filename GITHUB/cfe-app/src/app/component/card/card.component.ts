import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { SandboxComponent } from '../sandbox/sandbox.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('FlipCard',
    [
      state('NotFlipped', style({
        transform: 'rotateY(90deg)'
      })),
      state('Flipped', style({
        transform: 'rotateY(0deg)'
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
  source: string;
  xPos: Number;
  yPos: Number;
  flipping: Boolean = false;
  isFlipped: Boolean = false;
  public lastClickedCard: boolean = false;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    while(SandboxComponent.GetInstance() == null)
    {
      //Wait for SandboxComponent to be initialized
    }
    SandboxComponent.GetInstance().cardComponents.push(this);
    this.GetImageSource();
  }

  public ChangeClass(): void
  {
    SandboxComponent.GetInstance().ClearCardsClasses(this);
  }

  public GetPosition(e: CdkDragEnd): void
  {
    let rect = this.element.nativeElement.getBoundingClientRect();
    this.xPos = rect.x + e.source.getFreeDragPosition().x;
    this.yPos = rect.y + e.source.getFreeDragPosition().y
    console.log(this.xPos, this.yPos);
  }

  FlipCardOnDoubleClick(){
    this.isFlipped = !this.isFlipped;
    this.flipping = true;
    setTimeout(() => 
    {
      this.GetImageSource();
      this.flipping = false;
    }, 250);
  }

 GetImageSource()
 {
    if (!this.isFlipped)
    {
      this.source = '../../../assets/Cards/' + this.type + '/' + this.number + '.jpg';
    }
    else
    {
      this.source = '../../../assets/Cards/CardBack.jpg';
    }
 }

}
