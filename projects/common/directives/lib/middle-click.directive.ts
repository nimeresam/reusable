import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[mdlclick]',
})
export class MiddleClickDirective {

  @Output('mdlclick') event: EventEmitter<MouseEvent>;

  constructor() {
    this.event = new EventEmitter();
  }

  @HostListener('mousedown')
  click(): void {
    const mouseEvent = event as MouseEvent;
    if (mouseEvent.button === 1) {
      this.event.emit(mouseEvent);
      mouseEvent.preventDefault();
    }
  }
}
