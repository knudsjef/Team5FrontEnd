import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';

import { HomepageComponent } from './component/homepage/homepage.component';

// remote communication
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// bootstrap modules
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HostComponent } from './component/host/host.component';
import { TestPageComponent } from './component/testingGrounds/test-page/test-page.component';
import { SingleplayerComponent } from './component/singleplayer/singleplayer.component';
import { MultiplayerComponent } from './component/multiplayer/multiplayer.component';
import { SandboxComponent } from './component/sandbox/sandbox.component';
import { CardComponent } from './component/card/card.component';
import { LeaderboardComponent } from './component/leaderboard/leaderboard.component';
import { BlackjackComponent } from './component/blackjack/blackjack.component';
import { LoginComponent } from './component/login/login.component';
import { CreateUserComponent } from './component/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    BlackjackComponent,
    RoutingComponents,
    HomepageComponent,
    HostComponent,
    TestPageComponent,
    SingleplayerComponent,
    MultiplayerComponent,
    SandboxComponent,
    CardComponent,
    LeaderboardComponent,
    LoginComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    DragDropModule,
    MatTableModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
