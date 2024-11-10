"use client";
import React from "react";

export default function ButtonModalTriggers() {
	const [showCreateRoom, setShowCreateRoom] = React.useState(false);
	const [showJoinRoom, setShowJoinRoom] = React.useState(false);

	const toggleCreateRoom = () => setShowCreateRoom((prev) => !prev);
	const toggleJoinRoom = () => setShowJoinRoom((prev) => !prev);

	const buttonStyles =
		"font-bold p-2 rounded-md hover:scale-[1.01] transition duration-300";

	return (
		<div className="flex gap-2 w-full justify-center">
			<button
				className={`${buttonStyles} text-white bg-blue-600 hover:bg-blue-500`}
				onClick={toggleCreateRoom}
				aria-pressed={showCreateRoom}
			>
				Create Room
			</button>
			<button
				className={`${buttonStyles} text-blue-600 border border-blue-600 hover:bg-gray-100`}
				onClick={toggleJoinRoom}
				aria-pressed={showJoinRoom}
			>
				Join Room
			</button>

			{showCreateRoom && (
				<div className="modal">
					<p>Create Room Modal Content</p>
					<button onClick={toggleCreateRoom}>Close</button>
				</div>
			)}
			{showJoinRoom && (
				<div className="modal">
					<p>Join Room Modal Content</p>
					<button onClick={toggleJoinRoom}>Close</button>
				</div>
			)}
		</div>
	);
}
