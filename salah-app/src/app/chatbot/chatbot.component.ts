import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  isChatbotVisible = signal<boolean>(false);
  isChatbotDialogeVisible = signal<boolean>(true);

}
