/*import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase
} from "angularfire2/database";
*/
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Billing } from "./../models/billing";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ShippingService {

  shippings: AngularFirestoreCollection<Billing>;
  shipping: AngularFirestoreDocument<Billing>;

 // products: AngularFirestoreCollection<Product>;
	//product:  AngularFirestoreDocument<Product>;


  constructor(private db: AngularFirestore) {
    this.getshippings();
  }

  createshippings(data: Billing) {
    //this.shippings.push(data);
    this.db.collection('shippings').add(data);

  }

  getshippings() {
   // this.shippings = this.db.list("shippings");
   // return this.shippings;
  }

  getshippingById(key: string) {
   // this.shipping = this.db.object("products/" + key);
   // return this.shipping;
  }

  updateshipping(data: Billing) {
    //this.shippings.update(data.$key, data);
  }

  deleteshipping(key: string) {
    //this.shippings.remove(key);
  }
}
