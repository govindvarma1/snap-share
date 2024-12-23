import { NextResponse } from "next/server";
import {prisma} from "@/utils/prisma";

export async function POST() {
	try {
		let roomCode: number = 0;
		let isUnique = false;

		while (!isUnique) {
			roomCode = Math.floor(100000 + Math.random() * 900000);
			const existingRoom = await prisma.room.findUnique({
				where: { roomCode },
			});

			if (!existingRoom) {
				isUnique = true;
			}
		}

		const newRoom = await prisma.room.create({
			data: {
				roomCode,
				createdAt: new Date(),
			},
		});

		return NextResponse.json({ room: newRoom, success: true });
	} catch (error) {
		console.error("Error creating room:", (error as Error).message);
		return NextResponse.json(
			{ error: (error as Error).message, success: false },
			{ status: 500 }
		);
	}
}
