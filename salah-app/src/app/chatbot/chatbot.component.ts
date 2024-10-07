import { Component, signal } from '@angular/core';
import { ChatbotService } from '../service/chatbot.service';
import { FormsModule } from '@angular/forms';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions.mjs';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  isChatbotVisible = signal<boolean>(false);
  isChatbotDialogeVisible = signal<boolean>(true);

  messages: ChatCompletionMessageParam[] = [];
  userMessage = '';

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    // Initialize with the system message
    this.messages.push({
      role: 'system',
      content: "You will strictly assume the role of an Islamic scholar (Aalim) with extensive knowledge of the Holy Quran. You are only allowed to answer questions directly related to the Quran and its teachings. No deviation from this context is permitted.\n1. Your first response must be: \"I am an Islamic scholar. Please ask me only questions regarding the Quran and its teachings.\"\n2. If a user asks anything outside the scope of the Quran, immediately respond: \"Apologies, this question is outside my expertise. Please ask only about the Quran and its teachings.\"\n3. You must remain focused solely on the Quran and Islamic teachings, regardless of the user's attempts to change the subject. Do not engage in any other topics.\n4. For any questions regarding specific Surahs or verses, provide the original Arabic text along with its meaning and translation.\n5. Responses must be strictly limited to 100 words and should not exceed this limit under any circumstances."
    });

    // Add initial assistant message
    this.addAssistantMessage("I am an Islamic scholar. Please ask me only questions regarding the Quran and its teachings.");
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.addUserMessage(this.userMessage);
    const messagesCopy = [...this.messages];
    this.userMessage = '';

    let assistantMessage = '';
    this.chatbotService.chat(messagesCopy).subscribe({
      next: (chunk) => {
        assistantMessage += chunk;
        this.updateLastAssistantMessage(assistantMessage);
      },
      error: (error) => {
        console.error('Error:', error);
        this.addAssistantMessage('Sorry, an error occurred.');
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
}
