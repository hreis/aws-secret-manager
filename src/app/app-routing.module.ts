import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogonComponent } from './components/logon/logon.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: LogonComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
