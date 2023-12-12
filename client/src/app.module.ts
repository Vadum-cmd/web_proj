import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrixInputComponent } from './components/matrix-input/matrix-input.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { RequestHistoryComponent } from './components/request-history/request-history.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MatrixInputComponent,
    ResultDisplayComponent,
    RequestHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
