import type { cResult } from '$lib/consumet/routes/AdvancedSearch/types/cResponse';

export interface ICollection {
	title: string;
	descriptor?: string;
	items: any[];
}
