export interface Rakats {
    name: string;
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