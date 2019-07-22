// Angular Imports
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

// Model Imports
import { Course }  from 'src/app/shared/models/course';
import { Lesson }  from 'src/app/shared/models/lesson';
import { Concept } from 'src/app/shared/models/concept';

// System Imports
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';

@Injectable({
    providedIn: 'root'
})

export class ConceptService {
    // Definition of variables
    concepts: AngularFirestoreCollection<Concept>;
    concept:  AngularFirestoreDocument  <Concept>;

    // Initialization
    constructor(
        private database:      AngularFirestore,
        private authService:   AuthService,
        private toastrService: ToastrService
    ) { }

    // Obtain all concepts in the course's lesson.
    getConcepts(courseKey: string, lessonKey: string){
        this.concepts = this.database
            .collection('courses').doc(courseKey)
            .collection('lessons').doc(lessonKey)
            .collection('concepts');
        return this.concepts;
    }

    // Find a concept by its ID inside the course's lesson.
    getConceptByID(courseKey: string, lessonKey: string, conceptKey: string){
        this.concept = this.database
            .collection('courses') .doc(courseKey)
            .collection('lessons') .doc(lessonKey)
            .collection('concepts').doc(conceptKey);
        return this.concept;
    }

    // Create a concept and add it to the course's lesson.
    createConcept(courseKey: string, lessonKey: string, data: Concept){
        return this.database
            .collection('courses').doc(courseKey)
            .collection('lessons').doc(lessonKey)
            .collection('concepts').add(data);
    }

    // Updates a Concept
    updateLesson(data: Concept) {
        //	this.products.update(data.$key, data);
    }
  
    // Deletes a Concept
    deleteConcept(courseKey: string, lessonKey: string, conceptKey: string) {
        this.database.collection("courses").doc(courseKey).collection("lessons").doc(lessonKey).collection("concepts").doc(conceptKey).delete();
    }
}