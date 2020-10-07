import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { MultiplayerComponent } from './component/multiplayer/multiplayer.component';
import { SandboxComponent } from './component/sandbox/sandbox.component';
import { SingleplayerComponent } from './component/singleplayer/singleplayer.component';
import { TestPageComponent } from './component/testingGrounds/test-page/test-page.component';

//import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'singleplayer', component: SingleplayerComponent },
  { path: 'multiplayer', component: MultiplayerComponent },
  { path: 'sandbox', component: SandboxComponent },
  { path: 'test', component: TestPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [HomepageComponent, SingleplayerComponent, MultiplayerComponent, SandboxComponent, TestPageComponent]
