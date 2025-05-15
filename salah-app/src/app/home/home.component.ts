import { Component } from '@angular/core';
import { ModuleComponent } from './module/module.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { MarkdownModule } from 'ngx-markdown';

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

}
