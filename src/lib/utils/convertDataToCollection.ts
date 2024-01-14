import { getLargePoster } from '$lib/simkl/routes/utils/images';
import type { ICollection } from '$lib/simkl/types/Collection';

export const convertDataToCollection = (data: any, title: string) => {
	// const posters = data.map((item: any) => getLargePoster(item.poster));

	const dataToSendBack: ICollection = {
		items: data,
		title: title
	};

	return dataToSendBack;
};
