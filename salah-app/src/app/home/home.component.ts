import { Component, inject } from '@angular/core';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { AuthService } from '../service/auth.service';
import { TitleComponent } from '../shared/title/title.component';
import { HomeIcons } from '../model/home.model';
import { ModuleComponent } from '../shared/module/module.component';
import { module_icons, tool_icons } from '../shared/module/module.contant';

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
