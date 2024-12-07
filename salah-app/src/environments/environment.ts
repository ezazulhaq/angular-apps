const s3Bucket = import.meta.env.NG_APP_S3_BUCKET
const openStreetUrl = import.meta.env.NG_APP_OPEN_STREET_URL;
const groqApiModel = import.meta.env.NG_APP_GROQ_API_MODEL;

export const environment = {
    production: false,
    s3Bucket: `${s3Bucket}/dev`,
    api: {
        map: `${openStreetUrl}`
    },
    groq: {
        model: `${groqApiModel}`
    },
    supabase: {
        url: import.meta.env.SUPABASE_URL,
        anonKey: import.meta.env.SUPABASE_ANON_KEY
    }
};