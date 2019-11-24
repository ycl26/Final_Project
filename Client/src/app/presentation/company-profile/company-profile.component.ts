import { Component, OnInit, Input } from '@angular/core';
import {  Job } from 'src/app/common/models/job-model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  editMode:boolean; 
  newJobTitle:string= "New Job Title";
  @Input() jobs:Job[]; 
  
  constructor() { }

  ngOnInit() {
   
  }
  onEditClick(){
    this.editMode=true;
  }
  onSaveClick(){  
    this.editMode=false;  
  }
}
