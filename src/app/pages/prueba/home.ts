import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 tasks = signal<Task[]>([]);

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

  updateTaskEditingMode(index: number){
    this.tasks.update(prevState => {
      return prevState.map((task, position) =>{
        if (position === index){
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
        editing: false};
      })
    })
  }

    updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) =>{
        if (position === index){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() =>{
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'pending'){
      return tasks.filter(tasks => !tasks.completed)
    }
    
    if (filter === 'completed') {
      return tasks.filter(tasks => tasks.completed)
    }
    return tasks;
  })

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter)
  }



  clearCompleted() {
  this.tasks.update(tasks => tasks.filter(task => !task.completed));
}

  injector = inject(Injector)

  tackTasks(){
    effect(() =>{
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks))
    },{ injector:this.injector })
  }
  
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.tackTasks();
  }
}