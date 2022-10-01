import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoaderState } from '../public-api';

@Component({
  selector: 're-component-loader',
  templateUrl: './component-loader.component.html',
  styleUrls: ['./component-loader.component.css']
})
export class ComponentLoaderComponent implements OnChanges, LoaderState  {

  @Input() showLoading: boolean;
  @Input() hasError?: string | boolean | number;
  @Input() length?: number;

  state: "loading" | "error" | "empty" | "ready";

  constructor() { 
    this.showLoading = true;
    this.state = "loading"
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.showLoading) this.state = "loading";
    else if (this.hasError) this.state = "error";
    else if (this.length == 0) this.state = "empty";
    else  this.state = "ready";
  }

}
