import { Component, computed, signal, inject, Injector, effect} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  tasks = signal<Task[]>([

  ]);

  // FormControl para el input de nueva tarea
  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  //agregar tarea
  addTask(title:string): void{
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false,
      editing: false
    }
    this.tasks.update((tasks: Task[]) => [...tasks, newTask])
  }
//cargando y validacion de tareasS
  changeTaskList(): void {
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if(value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  deleteTask(index: number) {
  const li = document.querySelectorAll('.todo-list li')[index];
  li?.classList.add('removed');
  setTimeout(() => {
    this.tasks.update(tasks => tasks.filter((_, i) => i !== index));
  }, 300);
}

// //borrar una tarea
//   deleteTask(index:number): void {
//     this.tasks.update((tasks: Task[])=>
//     tasks.filter((tasks, position) => position !== index))
//   }
//cambiar estado de una tarea
  updateTaskComplete(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((tasks, position) => {
        if (position === index){
          return {
            ...tasks,
            completed: !tasks.completed
          }
        }
        return tasks
      })
    })
  }
  //activar modo de edicion
  editTask(index: number): void {
    this.tasks.update( tasks => 
      tasks.map((task, position) => ({
        ...task,
        editing: position === index
      }))
    )
  }

  //guardar los cambio al presionar enter
  updateTaskTitle(index: number, newTitle: string): void {
    this.tasks.update(tasks =>
      tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: newTitle.trim() || task.title,
            editing: false
          };
        }
        return task;
      })
    )
  }

  filter = signal< 'all' | 'pending' | 'completed'> ('all');

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'pending'){
      return tasks.filter(tasks => !tasks.completed)
    };

    if (filter === 'completed'){
      return tasks.filter(tasks => tasks.completed)
    }
    return tasks;
  }); 

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter)
  }

  clearCompleted() {
  if (confirm('¿Seguro que quieres eliminar las tareas completadas?')) {
    this.tasks.update(tasks => tasks.filter(task => !task.completed));
  }
}

  injector = inject(Injector)

  tackTasks(){
    effect(() =>{
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks))
    },{injector: this.injector});
  }

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.tackTasks();
  }




}