import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'brunch-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() title: string = 'button';
  @Input() showBorder: boolean = true;
  @Input() callToAction: boolean = false;
  @Input() compact: boolean = false;
  @Input() loading: boolean = false;

  @Output('buttonClick') buttonClick: EventEmitter<any> = new EventEmitter();

  clickHandler(){
    this.buttonClick.emit();
  }

}
