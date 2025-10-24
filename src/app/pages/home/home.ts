import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [CommonModule, ɵEmptyOutletComponent, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear un Proyecto en Angular',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear un Proyecto nuevos componentes',
      completed: false
    },
  ]);

  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false
    }
    this.tasks.update((tasks: Task[]) => [...tasks, newTask]);
  };


  changeTaskList(): void {
    if (this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if (value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  deleteTask(index: number): void {
    this.tasks.update((tasks: Task[]) => 
      tasks.filter((tasks, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((tasks, position) => {
        if (position === index) {
          return {
            ...tasks,
            completed: !tasks.completed
          }
        }
        return tasks;
      })
    });
  }


}