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
            category?: string;
        }) {
        try {
            // Insert feedback into the database
            // The email notification will be triggered automatically via the database trigger
            const { data, error } = await this.supabase
                .from('feedback')
                .insert({
                    content: feedbackData.content,
                    category: feedbackData.category,
                    // If the user is authenticated, their ID will be included automatically
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