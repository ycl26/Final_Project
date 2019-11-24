import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  editMode:boolean; 
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
