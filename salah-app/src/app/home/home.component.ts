import { Component, inject } from '@angular/core';
import { ModuleComponent } from './module/module.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { AuthService } from '../service/auth.service';
import { TitleComponent } from '../shared/title/title.component';
import { module_icons, tool_icons } from './module/module.contant';
import { HomeIcons } from '../model/home.model';

@Component({
  selector: 'app-home',
  imports: [
    ModuleComponent,
    ChatbotComponent,
    TitleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: "app-bg"
  }
})
export class HomeComponent {

  authService = inject(AuthService);

  modules: HomeIcons[] = module_icons; 
  tools: HomeIcons[] = tool_icons;

}
