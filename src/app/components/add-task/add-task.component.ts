import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() taskEmitter: EventEmitter<Task> = new EventEmitter();
  newTask!: Task;
  text!: string;
  day!: string;
  reminder: boolean = false;

  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  taskForm = new FormGroup({
    text: new FormControl('', Validators.required),
    day: new FormControl('', Validators.required),
    reminder: new FormControl(false, Validators.required),
  });

  onTaskSubmit() {
    this.text = this.taskForm.controls.text.value || '';
    this.day = this.taskForm.controls.day.value || '';
    this.reminder = this.taskForm.controls.reminder.value!;

    this.newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };
    this.taskEmitter.emit(this.newTask);

    this.taskForm.reset();
  }
}
