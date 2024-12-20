import { prisma } from "@/lib/prisma";
import RoomTimer from "../components/roomTimer";

const RoomPage = async ({
	params,
}: {
	params: Promise<{ roomCode: string }>;
}) => {
	const { roomCode } = await params;
	let room = null;

	const parsedRoomCode = parseInt(roomCode, 10);

	if (isNaN(parsedRoomCode)) {
		return <div className="p-6">Invalid Room Code</div>;
	}

	try {
		room = await prisma.room.findUnique({
			where: { roomCode: parsedRoomCode },
		});

		if (!room) {
			return <div className="p-6">Room not found</div>;
		}

		return (
			<div className="px-12 py-4">
				<div className="flex flex-col w-full items-center my-4 gap-2">
					<h1 className="text-4xl font-bold">SnapShare</h1>
					<RoomTimer createdAt={new Date(room.createdAt)} />
				</div>
				<h1 className="text-2xl font-bold">Room ID: {parsedRoomCode}</h1>
				<p className="text-gray-700">
					Room created at: {room.createdAt.toString()}
				</p>
			</div>
		);
	} catch (error) {
		console.error("Error fetching room:", error);
		return <div className="p-6">An error occurred. Please try again.</div>;
	}
};

export default RoomPage;
