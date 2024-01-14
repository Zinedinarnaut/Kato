export default class StringBuilder {
	private buffer: string[];
	constructor(initString?: string) {
		this.buffer = initString ? [initString] : [];
	}
	public Append(value: string): StringBuilder {
		this.buffer.push(value);
		return this;
	}
	public toString(): string {
		return this.buffer.join('');
	}
}
