export interface HadithChapters {
    id: string;
    chapter_no: number;
    chapter_name: string;
}

export interface Hadiths {
    id: string;
    source_name: string;
    chapter_name: string;
    hadith_no: number;
    text_en: string;
}