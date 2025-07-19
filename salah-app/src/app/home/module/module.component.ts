import { Component, signal } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { module_icons } from './module.contant';
import { HomeIcons } from '../../model/home.model';

@Component({
  selector: 'app-home-module',
  imports: [
    IconComponent
  ],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent {

  icons = signal<HomeIcons[]>(module_icons); 

}
