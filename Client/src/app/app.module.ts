import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './presentation/app.component';
import { LoginComponent } from './presentation/login/login.component';
import { AboutUsComponent } from './presentation/about-us/about-us.component';
import { from } from 'rxjs';
import { JobOffersComponent } from './presentation/job-offers/job-offers.component';
import { HomeComponent } from './presentation/home/home.component';
import { JobViewComponent } from './presentation/job-offers/components/job-view/job-view.component';
import { JobListComponent } from './presentation/job-offers/components/job-list/job-list.component';
import { JobItemComponent } from './presentation/job-offers/components/job-item/job-item.component';


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
