import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Observable, from, map, tap } from 'rxjs';
import { IslamicLibrary } from '../model/islamic-library.model';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {

    private readonly supabaseUrl: string = environment.supabase.url;
    private readonly supabaseKey: string = environment.supabase.anonKey;

    private readonly supabase: SupabaseClient;

    quranTranslator = signal<string>('');

    hadithSource = signal<string>('');

    constructor() {
        // Verify that both environment variables are correctly loaded
        if (!this.supabaseUrl || !this.supabaseKey) {
            console.error('Supabase URL or Key is missing from environment configuration');
        }

        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);

        this.quranTranslator.set(localStorage.getItem('quranTranslator') || 'ahmedraza');

        this.hadithSource.set(localStorage.getItem('hadithSource') || 'Sahih Bukhari');
    }

    getQuranTranslators(): Observable<any> {
        return from(
            this.supabase
                .from('translators')
                .select('name, full_name')
                .eq('is_active', true)
                .order('name', { ascending: true })
        );
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

    /**
     * Searches for hadiths based on a given query text.
     * 
     * @param query - The search text to find relevant hadiths
     * @returns An Observable that emits the search results from the Supabase Edge Function
     * 
     * @example
     * // Example usage
     * this.supabaseService.searchHadith("give me importance of Salat")
     *   .subscribe(
     *     results => console.log(results),
     *     error => console.error(error)
     *   );
     * 
     * @remarks
     * - The function invokes a Supabase Edge Function named 'search_hadiths'
     * - Results are limited to 3 items per search
     * - The request body is automatically stringified before sending
     */
    searchHadith(query: string): Observable<any> {
        const body = {
            query_text: query,
            result_limit: 3
        };

        return from(
            this.supabase.functions
                .invoke(
                    'search_hadiths',
                    {
                        body: JSON.stringify(body)
                    }
                )
        );
    }

    findActiveHadithSources(): Observable<any> {
        return from(
            this.supabase
                .from('sources')
                .select('name')
                .eq('is_active', true)
        );

    }

    /**
     * Method to call the 'get_chapter_info_by_source' stored procedure and return an Observable
     */
    getHadithChaptersFromSource(): Observable<any> {
        return from(
            this.supabase.rpc(
                'get_chapter_info_by_source',
                {
                    source_name: this.hadithSource()
                }
            )
        );
    }

    /**
     * Method to call the 'get_hadiths_by_chapter_id' stored procedure and return an Observable
     */
    getHadithByChapterId(
        input_chapter_id: string
    ): Observable<any> {
        return from(
            this.supabase.rpc(
                'get_hadiths_by_chapter_id',
                {
                    input_chapter_id
                }
            )
        );
    }

    /**
     * Method to call the 'get_hadith_details' stored procedure and return an Observable
     */
    getHadithDetailsFromId(
        hadith_id: string[]
    ): Observable<any> {
        return from(
            this.supabase.rpc(
                'get_hadith_details',
                {
                    hadith_id
                }
            )
        );
    }

    /**
     * Retrieves active Islamic library entries from the database.
     * 
     * @returns An Observable of IslamicLibrary array containing active library entries
     *          sorted by ID in ascending order. Each entry includes name, PDF name,
     *          category, and storage key information.
     * 
     * The returned data is mapped from the database format to match the IslamicLibrary interface:
     * - name: The display name of the library entry
     * - pdfName: The name of the PDF file
     * - category: The category of the library entry
     * - storageKey: The storage reference key for the document
     */
    getIslamicLibrary(): Observable<IslamicLibrary[]> {
        const library = localStorage.getItem('islamic_library');

        return from(
            this.supabase
                .from('islamic_library')
                .select('name, pdf_name, category, storage_key')
                .eq('is_active', true)
                .order('id', { ascending: true })
        ).pipe(
            map((response: any) => {
                // Map the response to match the IslamicLibrary interface
                return response.data.map((item: any) => ({
                    name: item.name,
                    pdfName: item.pdf_name,
                    category: item.category,
                    storageKey: item.storage_key
                }));
            }),
            map((library: IslamicLibrary[]) => this.addPageToLibraryItems(library)),
            tap((library: IslamicLibrary[]) => {
                const libraryData = localStorage.getItem('islamic_library');

                if (!libraryData) {
                    library.map(
                        item => {
                            return {
                                ...item,
                                page: 1,
                                totalPage: 0
                            };
                        }
                    );
                    localStorage.setItem('islamic_library', JSON.stringify(library));
                }
            })
        );
    }

    private addPageToLibraryItems(library: IslamicLibrary[]): IslamicLibrary[] {
        return library
            .map(
                item => {
                    const storedPage = localStorage.getItem(item.storageKey!);
                    const page = storedPage ? +storedPage : 1;
                    return { ...item, page };
                }
            );
    }
}