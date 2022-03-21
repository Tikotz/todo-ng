import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo2',
  templateUrl: './todo2.component.html',
  styleUrls: ['./todo2.component.css']
})
export class Todo2Component implements OnInit {

  tasks:string[] = [];
  constructor() { 

    this.tasks = [
      ' task 1 ',
      ' task 2 ',
      ' task 3 ',
    ]
  }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm){
    let newTask = addForm.value.task;
    this.tasks.push(newTask);
    addForm.resetForm();
  }
}
