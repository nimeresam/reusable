import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderComponent } from './component-loader/component-loader.component';
import { NotchLoaderComponent } from './notch-loader/notch-loader.component';
import { FullscreenLoaderComponent } from './fullscreen-loader/fullscreen-loader.component';

@NgModule({
  declarations: [
    ComponentLoaderComponent,
    NotchLoaderComponent,
    FullscreenLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentLoaderComponent,
    NotchLoaderComponent,
    FullscreenLoaderComponent
  ]
})
export class LoaderModule { }
