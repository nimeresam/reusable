import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 're-notch-loader',
  templateUrl: './notch-loader.component.html',
  styleUrls: ['./notch-loader.component.scss']
})
export class NotchLoaderComponent implements AfterViewInit, OnChanges {

  @Input() displayed: boolean;


  @ViewChild('notchEl') notchEl?: ElementRef<HTMLDivElement>;

  constructor() { 
    this.displayed = false;
  }

  ngAfterViewInit(): void {
    this.toggle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayed'] !== undefined) {
      this.toggle();
    }
  }

  public show(): void {
    if (!this.notchEl) return;
    this.displayed = true;
    this.notchEl.nativeElement.classList.add('show');
  }

  public hide(): void {
    if (!this.notchEl) return;
    this.displayed = false;
    this.notchEl.nativeElement.classList.remove('show');
  }
  
  public toggle(): void {
    if (this.displayed) this.show();
    else this.hide();
  }

}
