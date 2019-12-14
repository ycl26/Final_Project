import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatDivider} from '@angular/material';



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
import { CandidateProfileComponent } from './presentation/candidate-profile/candidate-profile.component';
import { CvListComponent } from './presentation/candidate-profile/components/cv-list/cv-list.component';
import { CvItemComponent } from './presentation/candidate-profile/components/cv-item/cv-item.component';
import { CvViewComponent } from './presentation/candidate-profile/components/cv-view/cv-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyProfileComponent } from './presentation/company-profile/company-profile.component';
import { ContactUsComponent } from './presentation/contact-us/contact-us.component';
import { ActiveCvListComponent } from './presentation/company-profile/active-cv-list/active-cv-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutUsComponent,
    JobOffersComponent,
    HomeComponent,
    JobViewComponent,
    JobListComponent,
    JobItemComponent,
    CandidateProfileComponent,
    CvListComponent,
    CvItemComponent,
    CvViewComponent,
    CompanyProfileComponent,
    MatDivider,
    ContactUsComponent,
    ActiveCvListComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule ,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
