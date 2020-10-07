import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { TestPageComponent } from './component/testingGrounds/test-page/test-page.component';
//import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'test', component: TestPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [HomepageComponent, TestPageComponent]
