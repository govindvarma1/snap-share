"use client";
import "@/app/components/styles/animations.css";
import React from "react";

export default function JoinRoomModal({
	showJoinRoom,
	setShowJoinRoom,
}: {
	showJoinRoom: boolean;
	setShowJoinRoom: (value: boolean) => void;
}) {
	const [roomId, setRoomId] = React.useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRoomId(event.target.value);
	};

	const handleClick = () => {
		setShowJoinRoom(false);
	};

	if (!showJoinRoom) {
		return null;
	}
	return (
		<div
			className="fixed inset-0 backdrop-blur-sm backdrop-brightness-80 bg-opacity-50 flex justify-center items-center z-50 transition duration-300"
			onClick={handleClick}
		>
			<div
				className="p-6 flex flex-col gap-3 bg-white rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-md animate-pop-out"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h1 className="text-xl font-semibold">Join Room</h1>
				<p className="text-gray-800 text-sm">
					Enter the code to join the room.
				</p>
				<input
					type="number"
					placeholder="Enter room no."
                    className="border-[1px] bg-gray-50 p-1 rounded-sm"
					onChange={handleChange}
				/>
				<div className="flex gap-2 justify-end">
					<button
						className="px-2 py-1 border-[1px] rounded-sm border-blue-500 hover:bg-gray-100 text-blue-500 font-bold"
						onClick={handleClick}
					>
						Cancel
					</button>
					<button
						className="px-2 py-1 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-bold"
						onClick={handleClick}
					>
						Join
					</button>
				</div>
			</div>
		</div>
	);
}
