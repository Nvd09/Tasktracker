import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  reminder!: boolean;

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
