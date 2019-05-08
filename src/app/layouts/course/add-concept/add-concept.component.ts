import { Component, OnInit, Input } from '@angular/core';
import { Concept } from 'src/app/shared/models/concept';
import { ConceptService } from 'src/app/shared/services/concept.service';
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
  constructor(private conceptService: ConceptService) { }

  ngOnInit() {
  }

  // Create a Lesson
  createConcept(conceptForm: NgForm) {
    conceptForm.value['conceptID'] = 'CONC_' + shortID.generate();

    this.conceptService.createConcept(this.courseKey, this.lessonKey, conceptForm.value);
    this.concept = new Concept();
    
    $('#exampleModalLong').modal('hide');
    toastr.success('Lesson' + conceptForm.value['conceptName'] + 'was added successfully.', 'Concept Creation');
  }
  
}

