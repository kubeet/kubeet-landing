import { Component, OnInit, Input } from '@angular/core';
import { Concept } from 'src/app/shared/models/concept';
import { ConceptService } from 'src/app/shared/services/concept.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';

// Declaration of helpful items.
declare var $: any;
declare var require: any;
declare var toastr: any;
const shortID = require('shortid');

@Component({
  selector: 'app-add-concept',
  templateUrl: './add-concept.component.html',
  styleUrls: ['./add-concept.component.scss']
})
export class AddConceptComponent implements OnInit {

  // Class Variables
  concept: Concept = new Concept();
  @Input() courseKey: string;
  @Input() lessonKey: string;

  // Obtain the ConceptService
  constructor(
    private conceptService: ConceptService,
    private angularStorage: AngularFireStorage
    ) { }

  ngOnInit() {
  }

  // Variables
  fileArchive;
  fileName    = '';
  fileUpload  = false;
  fileNumber  = 0;

  // Create a Concept
  createConcept(conceptForm: NgForm) {
    if (this.fileNumber > 0){
      let file = this.fileArchive;
      let ref  = this.angularStorage.ref(this.fileName);
      let task = this.angularStorage.upload(this.fileName, this.fileArchive);
      ref.getDownloadURL().subscribe(
        (URL) => {
          conceptForm.value['conceptFile'] = URL;
          conceptForm.value['conceptVideo'] = '';
          conceptForm.value['conceptType'] = 'File'
          this.fileUpload = true;
        },
        (error) => {
          console.log("AAAAAAA");
          console.log(error);
        },
        () => this.addConceptValues(conceptForm)
      );
    } else {
      conceptForm.value['conceptFile'] = '';
      conceptForm.value['conceptType'] = 'Video'
      this.addConceptValues(conceptForm);
    }
  }

  // Create a Concept helper
  addConceptValues(conceptForm: NgForm){
    conceptForm.value['conceptID'] = 'CONC_' + shortID.generate();

    this.conceptService.createConcept(this.courseKey, this.lessonKey, conceptForm.value);
    this.concept = new Concept();
    
    $('#exampleModalLong').modal('hide');
    toastr.success('Lesson' + conceptForm.value['conceptName'] + 'was added successfully.', 'Concept Creation');
  }
  
  // Get the File to Upload
  getFile(event){
    if (event.target.files.length > 0){
      for (let i=0; i<event.target.files.length; i++){
        this.fileName    = event.target.files[i].name;
        this.fileArchive = event.target.files[i];
      }
      this.fileNumber = event.target.files.length;
    }
  }
}

