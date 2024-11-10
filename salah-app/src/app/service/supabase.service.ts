import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {

    private supabaseUrl: string = environment.supabase.url;
    private supabaseKey: string = environment.supabase.anonKey;

    private supabase: SupabaseClient;

    constructor() {
        // Verify that both environment variables are correctly loaded
        if (!this.supabaseUrl || !this.supabaseKey) {
            console.error('Supabase URL or Key is missing from environment configuration');
        }

        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    /**
     * Method to call the 'get_surah_translation' stored procedure and return an Observable
     */
    getSurahTranslation(
        p_language_code: string,
        p_surah_id: number,
        p_translator_name: string
    ): Observable<any> {
        return from(
            this.supabase.rpc(
                'get_surah_translation',
                {
                    p_language_code,
                    p_surah_id,
                    p_translator_name
                }
            )
        );
    }

    /**
     * Get List of all the Surah
     * @returns Surah
     */
    getSurahList(): Observable<any> {
        return from(
            this.supabase
                .from('surahs')
                .select('surah_id, name, name_transliteration, name_en, total_ayas')
                .order('surah_id', { ascending: true })
        );
    }
}