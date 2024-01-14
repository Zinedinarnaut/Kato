export interface Characters {
	data: Data;
}

export interface Data {
	Media: Media;
}

export interface Media {
	characters: CharactersClass;
}

export interface CharactersClass {
	edges: Edge[];
}

export interface Edge {
	id: number;
	role: Role;
	node: Node;
	voiceActorRoles: VoiceActorRole[];
}

export interface Node {
	name: Name;
	image: Image;
}

export interface Image {
	large: string;
}

export interface Name {
	first: string;
	last: null | string;
	full: string;
	native: null | string;
	userPreferred: string;
	middle?: null | string;
}

export enum Role {
	Background = 'BACKGROUND',
	Main = 'MAIN',
	Supporting = 'SUPPORTING'
}

export interface VoiceActorRole {
	voiceActor: VoiceActor;
}

export interface VoiceActor {
	id: number;
	name: Name;
	image: Image;
}
