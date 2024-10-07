import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Groq from 'groq-sdk';
import { Observable } from 'rxjs';
import { ChatCompletion, ChatCompletionContentPart, ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions.mjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private groq: Groq;

  constructor() {
    this.groq = new Groq(
      {
        apiKey: environment.groq.apikey,
        dangerouslyAllowBrowser: true
      }
    );
  }

  chat(messages: ChatCompletionMessageParam[]): Observable<string> {
    return new Observable<string>((observer) => {
      this.groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null
      }).then(async (chatCompletion) => {
        for await (const chunk of chatCompletion) {
          observer.next(chunk.choices[0]?.delta?.content || '');
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
}
