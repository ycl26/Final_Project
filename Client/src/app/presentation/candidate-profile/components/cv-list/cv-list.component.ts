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
  selectedIndex: number = 1;

  constructor() { }

  ngOnInit() {
  }
  onCVViewDisplay(selectedCVItem){
    this.onCVItemClick.emit(selectedCVItem);
    console.log('que pasa');
    
  }
  setIndex(index: number) {
   this.selectedIndex = index;
 }
}


