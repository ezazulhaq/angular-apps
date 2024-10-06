const s3Bucket = import.meta.env.NG_APP_S3_BUCKET
const openStreetUrl = import.meta.env.NG_APP_OPEN_STREET_URL;
const groqApiKey = import.meta.env.NG_APP_GROQ_API_KEY;

export const environment = {
    production: true,
    s3Bucket: `${s3Bucket}`,
    api: {
        map: `${openStreetUrl}`
    },
    groqApiKey: `${groqApiKey}`
};