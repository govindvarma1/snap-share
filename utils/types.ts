export interface RoomDetails {
	id: number;
	roomCode: number;
	createdAt: Date;
}

export interface FileDetails {
	// id: number;
	roomCode: number;
	name: string;
	mediaAccessLink: string;
	size: number;
	mediaId: string;
}
