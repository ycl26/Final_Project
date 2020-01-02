import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/common/models/job-model';
import { CvService } from 'src/app/common/services/cv.service';
import { CV } from 'src/app/common/models/cv-model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  editMode: boolean;
  newJobTitle = 'New Job Title';
  @Input() jobs: Job[];
  listCVs: CV[];
  selectedCV: CV = {} as CV;
  cvTitleForSearch: string = "";
  
  constructor(
    private cvService: CvService,
  ) { }

  ngOnInit() {

  }
  onEditClick() {
    this.editMode = true;
  }

  onSaveClick() {
    this.editMode = false;
  }

  onSearchCVByTitle(cvTitle: string) {
    return this.searchCVByTitle(cvTitle)
      .then((CVs) => {
        this.listCVs = CVs;
      })
  }

  setSelectedCVViewModel(cv: CV) {
    this.selectedCV = cv;
  }

  searchCVByTitle(cvTitle: string): Promise<CV[]> {
    return new Promise((resolve, reject) => {
      this.cvService
        .findByTitle(cvTitle)
        .subscribe((CVs) => {
          resolve(CVs);
        }, (error) => {
          reject(error);
        });
    });
  }
}
