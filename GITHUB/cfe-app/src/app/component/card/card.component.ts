import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { SandboxComponent } from '../sandbox/sandbox.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() type: string;
  @Input() number: string;
  xPos: Number;
  yPos: Number;
  public lastClickedCard: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    while(SandboxComponent.GetInstance() == null)
    {
      //Wait for SandboxComponent to be initialized
    }
    SandboxComponent.GetInstance().cardComponents.push(this);
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

}
