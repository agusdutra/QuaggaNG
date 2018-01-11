import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms'
import {QuaggaCamModule} from './quagga-module/quagga-cam-module.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, QuaggaCamModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
