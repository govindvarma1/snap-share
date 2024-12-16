import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function Room({
	params,
}: {
	params: { roomCode: string };
}) {
	const roomCode = Number(params?.roomCode);
	if (isNaN(roomCode)) {
		return <div className="p-6">Invalid Room Code</div>;
	}

	const room = await prisma.room.findUnique({
		where: { roomCode },
	});

	if (!room) {
		return <div className="p-6">Room not found</div>;
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Room ID: {roomCode}</h1>
			<p className="text-gray-700">
				Room created at: {room.createdAt.toString()}
			</p>
		</div>
	);
}
