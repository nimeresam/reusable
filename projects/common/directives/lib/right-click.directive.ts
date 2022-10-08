import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[rtclick]',
})
export class RightClickDirective {
  @Output('rtclick') event: EventEmitter<MouseEvent>;
  private _contextMenuSubscription?: Subscription;

  constructor(private element: ElementRef<HTMLElement>) {
    this.event = new EventEmitter();
  }

  ngAfterViewInit(): void {
    this._contextMenuSubscription = fromEvent<PointerEvent>(document.body, 'contextmenu')
      .pipe(
        filter(
          (ev: PointerEvent) =>
            ev.target === this.element.nativeElement && ev.button == 2
        )
      )
      .subscribe((ev) => {
        ev.preventDefault();
      });
  }

  @HostListener('mousedown')
  click(): void {
    const mouseEvent = event as MouseEvent;
    if (mouseEvent.button === 2) {
      this.event.emit(mouseEvent);
    }
  }

  ngOnDestroy(): void {
    this._contextMenuSubscription?.unsubscribe();
  }
}
