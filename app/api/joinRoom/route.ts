import { NextResponse } from "next/server";
import {prisma} from "@/utils/prisma";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { roomCode } = body;
		if (!roomCode) {
			return NextResponse.json({
				error: "Room code is required",
				success: false,
			});
		}
		const room = await prisma.room.findUnique({
			where: { roomCode },
		});
		if (!room) {
			return NextResponse.json({
				error: "Could not find the room",
				roomExists: false,
				success: false,
			});
		}
		return NextResponse.json({ roomExists: true, success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message, success: false },
			{ status: 500 }
		);
	}
}
