import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[rtclick]',
})
export class RightClickDirective {

  @Output('rtclick') event: EventEmitter<MouseEvent>;

  constructor() {
    this.event = new EventEmitter();
  }

  @HostListener('mousedown')
  click(): void {
    const mouseEvent = event as MouseEvent;
    if (mouseEvent.button === 2) {
      this.event.emit(mouseEvent);
      mouseEvent.preventDefault();
    }
  }
}
