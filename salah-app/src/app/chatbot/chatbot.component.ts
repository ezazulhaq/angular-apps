import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ChatbotService } from '../service/chatbot.service';
import { FormsModule } from '@angular/forms';
import { SearchHadithResponse } from '../model/search-hadith.model';
import { ChatbotMessage } from './chatbot.model';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  isChatbotVisible = signal<boolean>(false);
  isChatbotDialogeVisible = signal<boolean>(true);

  messages: ChatbotMessage[] = [];
  userMessage = '';

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit() {

    // AutoClose Dialoge after 10 secs
    setInterval(() => {
      this.isChatbotDialogeVisible.set(false);
    }, 10000);

    // Add initial assistant message
    this.addAssistantMessage("I am an Islamic scholar. Please ask me only questions regarding the Quran and its teachings.");
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.addUserMessage(this.userMessage);

    this.chatbotService.queryIslam(this.userMessage).subscribe({
      next: (data: SearchHadithResponse) => {
        this.updateLastAssistantMessage(data.summary);
      },
      error: (error) => {
        console.error('Error:', error);
        this.addAssistantMessage('Sorry, an error occurred.');
      },
      complete: () => {
        this.userMessage = '';
        this.scrollToBottom();
      }
    });
  }

  private addUserMessage(content: string) {
    this.messages.push({ role: 'user', content });
  }

  private addAssistantMessage(content: string) {
    this.messages.push({ role: 'assistant', content });
  }

  private updateLastAssistantMessage(content: string) {
    const lastMessage = this.messages[this.messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      lastMessage.content = content;
    } else {
      this.addAssistantMessage(content);
    }
  }

  private scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight; // Scroll to the bottom
  }
}
