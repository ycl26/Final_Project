import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { from } from 'rxjs';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { HomeComponent } from './home/home.component';
import { JobViewComponent } from './job-offers/components/job-view/job-view.component';
import { JobListComponent } from './job-offers/components/job-list/job-list.component';
import { JobItemComponent } from './job-offers/components/job-item/job-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutUsComponent,
    JobOffersComponent,
    HomeComponent,
    JobViewComponent,
    JobListComponent,
    JobItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule ,
         
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
