import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDivider } from '@angular/material';
import { CV } from 'src/app/common/models/cv-model';
import { from } from 'rxjs';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit, OnChanges {
  @Input() selectedCV: CV;
  @Input() listCV: CV[];
  @Output() selected = new EventEmitter<any>();
  selectedIndex = 0; // TODO: initialice with the active cv from db

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const selectedCVChanges = changes['selectedCV'];
    if(selectedCVChanges && this.selectedIndex !== selectedCVChanges.currentValue) {
      const cv = selectedCVChanges.currentValue;
      this.selectedIndex = this.listCV.findIndex((item) => item.id === cv.id);
    }
  }

  onCVViewDisplay(selectedCVItem) {
    this.selected.emit(selectedCVItem);
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
}


