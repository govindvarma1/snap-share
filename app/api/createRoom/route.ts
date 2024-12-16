import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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
	} catch (error: any) {
		console.error("Error creating room:", error.message);
		return NextResponse.json(
			{ error: error.message, success: false },
			{ status: 500 }
		);
	}
}
