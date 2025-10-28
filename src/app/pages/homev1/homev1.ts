import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}


@Component({
  selector: 'app-homev1',
  imports: [FormsModule, CommonModule],
  templateUrl: './homev1.html',
  styleUrl: './homev1.css'
})
export class Homev1 {
  newTask: string = '';
  tasks: Task[] = [];

  constructor() {
    // Cargar las tareas guardadas al iniciar
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  addTask(): void {
    if (this.newTask.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      title: this.newTask.trim(),
      completed: false
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.newTask = ''; // Limpia el input
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.saveTasks();
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}