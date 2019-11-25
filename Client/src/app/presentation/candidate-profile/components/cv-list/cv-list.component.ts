import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import{MatDivider} from '@angular/material';
import { cv } from 'src/app/common/models/cv-model';
import { from } from 'rxjs';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit {
  @Input() listCV:cv[];
  @Output() onCVItemClick= new EventEmitter<any>();
  selectedIndex: number = 1; //TODO: initialice with the active cv from db

  constructor() { }

  ngOnInit() {
    
      this.selectedIndex = this.listCV.find(function (item) { return item.active === true; }).id;
   
  }
  onCVViewDisplay(selectedCVItem){
    this.onCVItemClick.emit(selectedCVItem);
    console.log('que pasa');
    
  }
  setIndex(index: number) {
   this.selectedIndex = index;
 }
}


