import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs';

export interface Task{
  name:string;
  isUpdated:boolean;
}


@Component({
  selector: 'app-todo2',
  templateUrl: './todo2.component.html',
  styleUrls: ['./todo2.component.css']
})
export class Todo2Component implements OnInit {

  tasks:Task[] = [];
  constructor() { 
  }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm){
    let newTask:Task = { name: addForm.value.task, isUpdated: false};
    this.tasks.push(newTask);
    addForm.resetForm();
  }

  handleRemove(t:string){
    this.tasks = this.tasks.filter((myTask:Task) => myTask.name != t);
  }

  handleUpdate(t:Task){
    t.isUpdated = true;
  }

  handleFinishUpdate(oldName:string,newTaskName:string){
    let updatedTask:Task = this.tasks.filter( (t) => t.name === oldName )[0];
    updatedTask.name = newTaskName;
    updatedTask.isUpdated = false;
  }


}
