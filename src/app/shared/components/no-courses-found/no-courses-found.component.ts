import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-courses-found',
  templateUrl: './no-courses-found.component.html',
  styleUrls: ['./no-courses-found.component.scss']
})
export class NoCoursesFoundComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input("title") title: String;
  // tslint:disable-next-line:no-input-rename
  @Input("description") description: String;
  constructor() {}

  ngOnInit() {}
}
