import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[confirm]'
})
export class ConfirmDirective {

  @Input() message?: string;

  @Output() confirmed: EventEmitter<void>;
  @Output() cancelled: EventEmitter<void>;

  constructor() { 
    this.message = "Are you sure?";
    this.confirmed = new EventEmitter();
    this.cancelled = new EventEmitter();
  }

  @HostListener('click')
  onClick() {
    let confirmed = confirm(this.message);
    if (confirmed) this.confirmed.emit();
    else this.cancelled.emit();
  }

}
