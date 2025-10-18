import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 tasks = signal<string[]>([
    "Instalar el Angular CLI",
    "Crear un proyecto",
    "Crear un componente",
    "crear un servicio",
    "crear un modelo"
  ]);
}
