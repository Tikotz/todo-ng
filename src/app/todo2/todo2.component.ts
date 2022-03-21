import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-todo2',
  templateUrl: './todo2.component.html',
  styleUrls: ['./todo2.component.css']
})
export class Todo2Component implements OnInit {

  tasks:string[] = [];
  constructor() { 

    
    
  }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm){
    let newTask = addForm.value.task;
    this.tasks.push(newTask);
    addForm.resetForm();
  }

  handleRemove(t:string){
    this.tasks = this.tasks.filter((myTask) => myTask != t);
  }
}
