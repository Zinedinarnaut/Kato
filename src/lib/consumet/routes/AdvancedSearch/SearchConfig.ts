import StringBuilder from '$lib/utils/StringBuilder';
import { cFormat, cGenres, cSeason, cSort, cStatus, cType } from './types';

export default class SearchConfig {
	public Page = 1;
	public Query?: string;
	public Type: cType = cType.Anime;
	public Season?: cSeason;
	public Format?: cFormat;
	public Status?: cStatus;
	public Genres?: cGenres[];
	public Sort?: cSort[];
	public ConfigToString(): string {
		const builder = new StringBuilder('?');
		if (this.Page) builder.Append(`page=${this.Page}&`);
		if (this.Query) builder.Append(`query=${this.Query}&`);
		if (this.Type) builder.Append(`type=${this.Type}&`);
		if (this.Season) builder.Append(`season=${this.Season}&`);
		if (this.Format) builder.Append(`format=${this.Format}&`);
		if (this.Status) builder.Append(`status=${this.Status}&`);
		if (this.Genres) builder.Append(`genres=${JSON.stringify(this.Genres)}&`);
		if (this.Sort) builder.Append(`sort=${JSON.stringify(this.Sort)}&`);
		let finalStr = builder.toString().trimEnd();
		if (finalStr.endsWith('&')) {
			finalStr = finalStr.substring(0, finalStr.length - 1);
		}
		return finalStr;
	}
}
