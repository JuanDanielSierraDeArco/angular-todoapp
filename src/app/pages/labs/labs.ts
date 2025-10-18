import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.html',
  styleUrl: './labs.css'
})
export class Labs {
  name: string = "Juan Sierra";
  age: number = 27;
  disabled: boolean = false;
  img: string = 'https://www.w3schools.com/w3images/avatar2.png';

  person: {name:string, age:number, avatar:string, disabled:boolean} = {
    name: 'Juan Daniel Sierra',
    age: 27,
    avatar: 'https://www.w3schools.com/w3images/avatar2.png',
    disabled: false
  }

  tasks = signal<string[]>([
    "Instalar el Angular CLI",
    "Crear un proyecto",
    "Crear un componente",
    "crear un servicio",
    "crear un modelo"
  ]);

  clickHandler() {
    alert("Hola " + this.person.name);
  }

    clickHandlerv2() {
    alert("Hola " + this.person.name + " haz doble click");
  }

  changeHander(event: Event) {
    console.log((<HTMLInputElement>event.target).value);
  }

  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  username = signal('Juan Sierra De Arco');

  changeUsername(event: Event) {
    const input = event.target as HTMLInputElement;
    const newvalue = input.value;
    this.username.set(newvalue);
  }
  


}
