"use server";
import { prisma } from "@/utils/prisma";
import { utapi } from "@/utils/uploadthingClient";

export const getRoomDetails = async (roomCode: number) => {
	try {
		const room = await prisma.room.findUnique({
			where: { roomCode: roomCode },
		});
		return room;
	} catch (error) {
		throw error;
	}
};

export const deleteRoom = async (roomCode: number) => {
	try {
		const room = await prisma.room.findUnique({
			where: { roomCode },
			select: {
				id: true,
				files: true,
			},
		});

		if (!room) {
			return false;
		}

		const fileIds = room.files.map((file: { mediaId: string }) => file.mediaId);

		if (fileIds.length > 0) {
			await utapi.deleteFiles(fileIds);
			console.log(`Deleted ${fileIds.length} from UploadThing`);
		}

		await prisma.room.delete({
			where: { roomCode },
		});
		return true;
	} catch (error) {
		throw error;
	}
};

export const isRoomValid = async (roomCode: number) => {
	try {
		const room = await prisma.room.findUnique({
			where: {
				roomCode,
			},
		});
		if (!room) {
			console.log("room does not exit");
			return false;
		}
		const expiryTime = room.createdAt.getTime() + 15 * 60 * 1000;
		const currentTime = new Date().getTime();
		if (expiryTime <= currentTime) {
			console.log("room expired");
			return false;
		}
		return true;
	} catch (error) {
		console.error("Error: ", error);
		return false;
	}
};

export const saveFiles = async (
	roomCode: number,
	mediaAccessLink: string,
	name: string,
	size: number,
	mediaId: string
) => {
	try {
		const file = await prisma.file.create({
			data: {
				roomCode,
				mediaAccessLink,
				name,
				size,
				mediaId,
			},
		});
		console.log("File: ", file);
	} catch (error) {
		console.error("Error: ", error);
	}
};

export const fetchFiles = async (roomCode: number) => {
	try {
		const files = await prisma.file.findMany({
			where: {
				roomCode,
			},
		});
		const modifiedFileDetails = files.map((file) => ({
			roomCode: roomCode,
			name: file.name,
			mediaAccessLink: file.mediaAccessLink,
			size: file.size,
			mediaId: file.mediaId,
		}));
		return modifiedFileDetails;
	} catch (error) {
		throw error;
	}
};

export const deleteFile = async (mediaId: string) => {
	try {
		await prisma.file.deleteMany({
			where: { mediaId: mediaId },
		});
		await utapi.deleteFiles(mediaId);
		console.log("Deleted File", mediaId);
		return true;
	} catch (error) {
		throw error;
	}
};
