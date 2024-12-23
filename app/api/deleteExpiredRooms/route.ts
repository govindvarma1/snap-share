import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
	try {
		const now = new Date();
		const threshold = new Date(now.getTime() - 15 * 60 * 1000);

		const deletedRooms = await prisma.room.deleteMany({
			where: {
				createdAt: {
					lt: threshold,
				},
			},
		});
		console.log(`Deleted ${deletedRooms.count} expired rooms`);
		return NextResponse.json(
			{ msg: `Deleted ${deletedRooms.count} expired rooms`, success: true },
			{ status: 200 }
		);
	} catch (error) {
        console.error("Error deleting expired rooms:", error);
		return NextResponse.json(
			{ error: (error as Error).message, success: false },
			{ status: 500 }
		);
	}
}