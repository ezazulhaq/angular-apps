import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            environment.supabase.url,
            environment.supabase.anonKey
        );
    }

    async submitFeedback(
        feedbackData: {
            content: string;
            email: string;
            category?: string;
        }) {
        try {
            // Insert feedback into the database
            const { data, error } = await this.supabase
                .from('feedback')
                .insert({
                    content: feedbackData.content,
                    email: feedbackData.email,
                    category: feedbackData.category,
                })
                .select();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error submitting feedback:', error);
            return { success: false, error };
        }
    }
}