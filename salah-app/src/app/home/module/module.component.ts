import { Component, signal } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { module_icons, ModuleIcons } from './module.contant';

@Component({
  selector: 'app-home-module',
  imports: [
    IconComponent
  ],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent {

  icons = signal<ModuleIcons[]>(module_icons); 

}
