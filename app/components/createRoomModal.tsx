import "@/app/components/styles/animations.css";
import { useRouter } from "next/navigation";
import React from "react";
import "./styles/loader.css";
import Loader from "./Loader";

export default function CreateRoomModal({
	showCreateRoom,
	setShowCreateRoom,
}: {
	showCreateRoom: boolean;
	setShowCreateRoom: (value: boolean) => void;
}) {
	const [isRoomCreating, setIsRoomCreating] = React.useState(false);

	const router = useRouter();
	const closeModal = () => {
		setShowCreateRoom(false);
	};

	const createRoom = async () => {
		setIsRoomCreating(true);
		try {
			const response = await fetch("/api/createRoom", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();
			console.log("Room created:", data);

			const roomCode = data.room.roomCode;

			router.push(`${roomCode}`);

			setShowCreateRoom(false);
		} catch (error) {
			console.error("Failed to create room:", error);
		} finally {
			setIsRoomCreating(false);
		}
	};

	if (!showCreateRoom) {
		return null;
	}
	return (
		<div
			className="fixed inset-0 backdrop-blur-sm backdrop-brightness-80 bg-opacity-50 flex items-center justify-center z-50 transition duration-300"
			onClick={closeModal}
		>
			<div
				className="bg-white  flex flex-col gap-3 rounded-lg shadow-lg p-6 w-full max-w-[90%] sm:max-w-md animate-pop-out"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">Create Room</h2>
				</div>
				<div>
					<p className="text-gray-800 text-sm">
						Generate a unique code for your room, so others can easily join from
						their devices.
					</p>
				</div>
				<div className="flex justify-end gap-2">
					<button
						onClick={closeModal}
						className="bg-white border-[1px] hover:bg-gray-100 text-blue-500 border-blue-500 font-semibold py-1 px-2 rounded"
					>
						Cancel
					</button>
					<button
						onClick={createRoom}
						className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded`}
						disabled={isRoomCreating}
					>
						{isRoomCreating ? <Loader /> : "Create"}
					</button>
				</div>
			</div>
		</div>
	);
}
