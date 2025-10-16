import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  name = "Juan Sierra";
  tasks = <string[]>[
    "Instalar el Angular CLI",
    "Crear un proyecto",
    "Crear un componente",
    "crear un servicio",
    "crear un modelo"
  ];
}
