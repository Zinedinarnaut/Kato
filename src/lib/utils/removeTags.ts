function removeTags(str: string): string {
	if (str === null || str === '') {
		return '';
	} else {
		return str.replace(/(<([^>]+)>|\*)/gi, '');
	}
}
export default removeTags;
