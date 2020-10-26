import { Component, Input, OnInit} from '@angular/core';
import { SandboxComponent } from '../sandbox/sandbox.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() type: string;
  @Input() number: string;
  source: string;
  xPos: Number;
  yPos: Number;
  isSingleClick: Boolean = false;
  isFlipped: Boolean = false;
  public lastClickedCard: boolean = false;

  constructor() {
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

  public GetPosition(e): void
  {
    this.xPos = e.clientX;
    this.yPos = e.clientY;
    console.log(this.xPos + ", " + this.yPos);
  }

  FlipCardOnDoubleClick(){
    this.isFlipped = !this.isFlipped;
    this.GetImageSource();
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
