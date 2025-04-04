import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ChatbotService } from '../service/chatbot.service';
import { FormsModule } from '@angular/forms';
import { HadithReference, SearchHadithResponse } from '../model/search-hadith.model';
import { ChatbotMessage } from './chatbot.model';
import { HadithLinksComponent } from './hadith-links/hadith-links.component';
import * as showdown from 'showdown'; // Import the showdown library

@Component({
  selector: 'app-chatbot',
  imports: [
    FormsModule,
    HadithLinksComponent
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  isChatbotVisible = signal<boolean>(false);
  isChatbotDialogeVisible = signal<boolean>(true);

  messages: ChatbotMessage[] = [];
  userMessage = '';

  converter!: showdown.Converter;

  isChatRequested = signal<boolean>(false);

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit() {

    // AutoClose Dialoge after 10 secs
    setInterval(() => {
      this.isChatbotDialogeVisible.set(false);
    }, 10000);

    // Add initial assistant message
    this.addAssistantMessage("I am an Islamic scholar. Please ask me only questions regarding the Islam and its teachings.");

    this.converter = new showdown.Converter();
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.isChatRequested.set(true);
    this.addUserMessage(this.userMessage);

    this.chatbotService.queryIslam(this.userMessage).subscribe({
      next: (data: SearchHadithResponse) => {
        this.updateLastAssistantMessage(data.summary, data.results);
      },
      error: (error) => {
        console.error('Error:', error);
        this.addAssistantMessage('Sorry, an error occurred.');
      },
      complete: () => {
        this.userMessage = '';
        this.isChatRequested.set(false);
        this.scrollToBottom();
      }
    });
  }

  protected clearChat() {
    this.messages = [];
    this.addAssistantMessage("I am an Islamic scholar. Please ask me only questions regarding the Islam and its teachings.");
  }

  private addUserMessage(content: string) {
    this.messages.push({ role: 'user', content });
  }

  private addAssistantMessage(content: string, links?: HadithReference[]) {
    this.messages.push({ role: 'assistant', content, links });
  }

  private updateLastAssistantMessage(content: string, links?: HadithReference[]) {
    const lastMessage = this.messages[this.messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      lastMessage.content = content;
    } else {
      this.addAssistantMessage(content, links);
    }
  }

  private scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight; // Scroll to the bottom
  }

  //method to use converter
  convertMarkdownToHtml(markdown: string): string {
    return this.converter.makeHtml(markdown);
  }
}
