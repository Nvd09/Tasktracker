import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  /* We want to create a addTask boolean in the service class so that we can 
  subscribe to it from multiple components. To subscribe from multiple components,
  we need to use the Subject and Subcription. So once the function is called the 
  Observable function will emit to all the locations its subscribed to.
  */
  private showAddTask: boolean = false;
  private subject = new Subject();
  constructor() {}

  //this function will change the boolean showAddTask
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    //We need to the subject to get the value of our showAddTask
    this.subject.next(this.showAddTask);
  }
  // We need a function that will emit the updated value of showAddTask
  // Other classes will subscribe to the observable value of this function.
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
