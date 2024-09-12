import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  deptos =[
  'Guatemala',
  'El Progreso',
  'Sacatepéquez',
  'Chimaltenango',
  'Escuintla',
  'Santa Rosa',
  'Sololá',
  'Totonicapán',
  'Quetzaltenango',
  'Suchitepéquez',
  'Retalhuleu',
  'San Marcos',
  'Huehuetenango',
  'Quiché',
  'Baja Verapaz',
  'Alta Verapaz',
  'Petén',
  'Izabal',
  'Zacapa',
  'Chiquimula',
  'Jalapa',
  'Jutiapa']

}
