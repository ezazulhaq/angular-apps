export type SearchHadithResponse = {
    results: HadithReference[];
    summary: string;
}

export interface HadithReference {
    id: string;
    source_name: string;
    chapter_name: string;
    hadith_no: number;
    text_ar: string;
    text_en: string;
    similarity: number;
}