"use server";
import { prisma } from "@/utils/prisma";

export const deleteRoom = async (roomCode: number) => {
	try {
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
				roomCode
			}
		})
		if(!room) {
			console.log("room does not exit");
			return false;
		}
		const expiryTime  = room.createdAt.getTime() + 15 * 60 * 1000;
		const currentTime = new Date().getTime();
		if(expiryTime <= currentTime) {
			console.log("room expired");
			return false;
		}
		return true;
	} catch (error) {
		console.error("Error: ", error);
		return false;
	}
}

export const saveFiles = async (
	roomCode: number,
	mediaAccessLink: string,
	name: string,
	size: number
) => {
	try {
		const file = await prisma.file.create({
			data: {
				roomCode,
				mediaAccessLink,
				name,
				size,
			},
		});
		console.log("File: ", file);
	} catch (error) {
		console.error("Error: ", error);
	}
};
