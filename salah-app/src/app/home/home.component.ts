import { Component } from '@angular/core';
import { ModuleComponent } from './module/module.component';

@Component({
  selector: 'app-home',
  imports: [
    ModuleComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: "app-bg"
  }
})
export class HomeComponent {

}
