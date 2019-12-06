import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './presentation/about-us/about-us.component';
import { LoginComponent } from './presentation/login/login.component';
import { HomeComponent } from './presentation/home/home.component';
import { JobOffersComponent } from './presentation/job-offers/job-offers.component';
import { CandidateProfileComponent } from './presentation/candidate-profile/candidate-profile.component';
import { CompanyProfileComponent } from './presentation/company-profile/company-profile.component';
import { ContactUsComponent } from './presentation/contact-us/contact-us.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'about', component: AboutUsComponent },
  { path: 'jobOffers', component: JobOffersComponent },
  { path: 'candidateProfile', component: CandidateProfileComponent },
  {path:'companyProfile', component:CompanyProfileComponent},
  {path:'contactUs', component:ContactUsComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
