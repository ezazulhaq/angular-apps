import { Component, inject } from '@angular/core';
import { ModuleComponent } from './module/module.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    ModuleComponent,
    ChatbotComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: "app-bg"
  }
})
export class HomeComponent {

  authService = inject(AuthService);

}
