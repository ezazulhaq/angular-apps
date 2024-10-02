const s3Bucket = import.meta.env.NG_APP_S3_BUCKET
const openStreetUrl = import.meta.env.NG_APP_OPEN_STREET_URL;

export const environment = {
    production: false,
    s3Bucket: `${s3Bucket}/dev`,
    api: {
        map: `${openStreetUrl}`
    }
};