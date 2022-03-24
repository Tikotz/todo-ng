import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs';

export interface Task {
  name: string;
  isUpdated: boolean;
  isVisible: boolean;
}

enum SortOptions {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

@Component({
  selector: 'app-todo2',
  templateUrl: './todo2.component.html',
  styleUrls: ['./todo2.component.css']
})
export class Todo2Component implements OnInit {

  tasks: Task[] = [];
  constructor() {
  }

  readonly TASK_KEY = 'tasks';

  SortEnum = SortOptions;
  sort: SortOptions = SortOptions.NONE;


  ngOnInit(): void {
    let savedTasksJson = localStorage.getItem(this.TASK_KEY);
    if (savedTasksJson != null) {
      this.tasks = JSON.parse(savedTasksJson);
    }
  }

  handleSubmit(addForm: NgForm) {
    let newTask: Task = { name: addForm.value.task, isUpdated: false , isVisible: true};
    this.tasks.push(newTask);
    addForm.resetForm();
  }

  handleRemove(t: string) {
    this.tasks = this.tasks.filter((myTask: Task) => myTask.name != t);
  }

  handleUpdate(t: Task) {
    t.isUpdated = true;
  }

  handleFinishUpdate(oldName: string, newTaskName: string) {
    let updatedTask: Task = this.tasks.filter((t) => t.name === oldName)[0];
    updatedTask.name = newTaskName;
    updatedTask.isUpdated = false;
  }

  handleSort(sortDirection: SortOptions) {
    if (sortDirection === this.sort) {
      this.sort = SortOptions.NONE;
      return;
    }
    
    this.sort = sortDirection;

    switch (sortDirection) {
      case SortOptions.ASC:
        this.tasks = this.tasks.sort((a, b) => {

          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();

          if (aLower < bLower) {
            return -1;
          }
          if (aLower > bLower) {
            return 1;
          } return 0
        })
        break;
      case SortOptions.DESC:
        this.tasks = this.tasks.sort((a, b) => {

          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();
          if (aLower > bLower) {
            return -1;
          }
          if (aLower < bLower) {
            return 1;
          }
          return 0
        })
        break;
      case SortOptions.NONE:
      default:
        break;
    }
  }

  handleSearch(v:string) {
    this.tasks.map ( (task) => {
      task.isVisible = (task.name.includes(v));
    });
  }

  handleSave():void{
    localStorage.setItem(this.TASK_KEY,JSON.stringify(this.tasks))
  }
}
