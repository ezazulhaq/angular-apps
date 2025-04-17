import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "../../environments/environment";
import { Observable, from, map, tap } from "rxjs";
import { IslamicLibrary } from "../model/islamic-library.model";

@Injectable({
    providedIn: 'root'
})
export class LibraryService {

    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            environment.supabase.url,
            environment.supabase.anonKey
        );
    }

    /**
     * Retrieves a list of Islamic library items from Supabase.
     * Filters items where 'is_active' is true and orders them by 'id' in ascending order.
     * Maps the response data to the IslamicLibrary interface, adds page numbers, and saves the library data to local storage.
     * @returns An Observable emitting an array of IslamicLibrary objects.
     */
    getIslamicLibrary(): Observable<IslamicLibrary[]> {
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
            tap((library: IslamicLibrary[]) => this.saveToLocalStorage(library))
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

    private saveToLocalStorage(library: IslamicLibrary[]): void {
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
    }

}