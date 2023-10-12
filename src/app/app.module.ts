import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { GamesComponent } from './components/games/games.component';
import { CocoaRushComponent } from './components/cocoa-rush/cocoa-rush.component';
import { WinComponent } from './components/win/win.component';
import { DiceGameComponent } from './components/dice-game/dice-game.component';
import { LuckyWheelComponent } from './components/lucky-wheel/lucky-wheel.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    CarouselComponent,
    GamesComponent,
    CocoaRushComponent,
    WinComponent,
    DiceGameComponent,
    LuckyWheelComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
