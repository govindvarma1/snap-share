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
