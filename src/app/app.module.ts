import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms'
import {NgQuaggaModule} from './quagga-module/ng-quagga-module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, NgQuaggaModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
