import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { CocoaRushComponent } from './components/cocoa-rush/cocoa-rush.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'games', component: GamesComponent, },
  { path: 'cocoa-rush', component: CocoaRushComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
