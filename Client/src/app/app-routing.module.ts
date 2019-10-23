import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{AppComponent} from './app.component';
import{AboutUsComponent} from './about-us/about-us.component';


const routes: Routes = [
  { path: 'home', component: AppComponent },  
  { path: 'about', component: AboutUsComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
