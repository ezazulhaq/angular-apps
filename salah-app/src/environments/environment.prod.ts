const s3Bucket = import.meta.env.NG_APP_S3_BUCKET
const openStreetUrl = import.meta.env.NG_APP_OPEN_STREET_URL;

export const environment = {
    production: true,
    s3Bucket: `${s3Bucket}`,
    api: {
        map: `${openStreetUrl}`
    },
    supabase: {
        url: import.meta.env.SUPABASE_URL,
        anonKey: import.meta.env.SUPABASE_ANON_KEY
    }
};