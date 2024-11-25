import { NamazTypes } from "../model/namaz-time.model";

export interface PrayerTimeInfo {
    key: string;
    value: NamazTypes;
    isClosest: boolean;
}
