export interface NamazTimes {
    fajr: NamazTypes;
    sunrise: NamazTypes;
    dhuhr: NamazTypes;
    asr: NamazTypes;
    maghrib: NamazTypes;
    isha: NamazTypes;
}

export type NamazTypes = {
    time: Date;
    rakats?: Rakats;
}

type Rakats = {
    before_fard: {
        sunnah: number;
    };
    fard: number;
    after_fard: {
        sunnah: number | string; // "4+2" for Jumuah
        nafl: number;
        wajib: number;
    };
}