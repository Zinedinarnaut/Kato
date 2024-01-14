import type { Anime } from ".";

export interface Seasonal {
    trending: Anime[];
    popular: Anime[];
    top: Anime[];
    seasonal: Anime[];
}