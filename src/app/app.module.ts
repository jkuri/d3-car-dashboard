import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoBottomComponent } from './components/info-bottom/info-bottom.component';
import { InfoMapComponent } from './components/info-map/info-map.component';
import { InfoTopComponent } from './components/info-top/info-top.component';
import { RpmGaugeComponent } from './components/rpm-gauge/rpm-gauge.component';
import { SpeedGaugeComponent } from './components/speed-gauge/speed-gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InfoBottomComponent,
    InfoMapComponent,
    InfoTopComponent,
    RpmGaugeComponent,
    SpeedGaugeComponent
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
