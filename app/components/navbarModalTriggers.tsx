"use client";
import React from "react";
import CreateRoomModal from "./createRoomModal";
import JoinRoomModal from "./joinRoomModal";

export default function NavBarModalTriggers() {
	const [showCreateRoom, setShowCreateRoom] = React.useState(false);
	const [showJoinRoom, setShowJoinRoom] = React.useState(false);

    
	const toggleCreateRoom = () => setShowCreateRoom((prev) => !prev);
	const toggleJoinRoom = () => setShowJoinRoom((prev) => !prev);

	return (
		<div className="flex gap-2">
			<button className="font-bold hover:bg-gray-100 p-1 rounded-md" onClick={toggleCreateRoom}>
				Create Room
			</button>
			<button className="font-bold hover:bg-gray-100 p-1 rounded-md" onClick={toggleJoinRoom}>
				Join Room
			</button>
			{showCreateRoom && (
				<CreateRoomModal
					showCreateRoom={showCreateRoom}
					setShowCreateRoom={setShowCreateRoom}
				/>
			)}
			{showJoinRoom && (
				<JoinRoomModal
					showJoinRoom={showJoinRoom}
					setShowJoinRoom={setShowJoinRoom}
				/>
			)}
		</div>
	);
}
