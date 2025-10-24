import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.html',
  styleUrl: './labs.css'
})
export class Labs {
  name: string = "Juan Sierra";
  age: number = 27;
  disabled: boolean = false;
  img: string = 'https://www.w3schools.com/w3images/avatar2.png';

  person = signal<{name:string, age:number, avatar:string, disabled:boolean}>({
    name: 'Juan Daniel Sierra',
    age: 27,
    avatar: 'https://www.w3schools.com/w3images/avatar2.png',
    disabled: false
  });

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
  
  changePersonAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newAge = Number(input.value);
    this.person.update((currentPerson) => ({
      ...currentPerson,
      age: newAge
    }));
  }

  changePersonNmae(event: Event){
    const input = event.target as HTMLInputElement;
    const newInput = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newInput
      }
    })
  }

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

}
