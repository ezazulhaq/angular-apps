import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Groq from 'groq-sdk';
import { from, map, Observable, take, tap } from 'rxjs';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions.mjs';
import { SupabaseService } from './supabase.service';
import { SearchHadithResponse } from '../model/search-hadith.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private groq: Groq;

  constructor(private supabaseService: SupabaseService) {
    this.groq = new Groq(
      {
        apiKey: import.meta.env.NG_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      }
    );
  }

  chat(messages: ChatCompletionMessageParam[]): Observable<string> {
    return new Observable<string>((observer) => {
      this.groq.chat.completions.create({
        messages: messages,
        model: environment.groq.model,
        temperature: 0.4,
        max_tokens: 512,
        top_p: 0.4,
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

  queryIslam(query: string): Observable<SearchHadithResponse> {
    return from(this.supabaseService.searchHadith(query))
      .pipe(
        take(1),
        map((response: any) => response.data)
      );
  }
}
