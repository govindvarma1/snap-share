export interface RoomDetails {
	id: number;
	roomCode: number;
	createdAt: Date;
}

export interface FileDetails {
	id: number;
	name: string;
	url: string;
	roomCode: number;
	uploadedAt: Date;
    updatedAt: Date;
}
