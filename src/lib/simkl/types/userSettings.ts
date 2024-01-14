export interface UserSettings {
	user: User;
	account: Account;
	connections: Connections;
}

export interface User {
	name: string;
	joined_at: string;
	gender: string;
	avatar: string;
	bio: string;
	age: string;
}

export interface Account {
	id: number;
	timezone: string;
	type: string;
}

export interface Connections {
	facebook: boolean;
}
