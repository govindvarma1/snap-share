export default function JoinRoomModal({
	showJoinRoom,
	setShowJoinRoom,
}: {
	showJoinRoom: boolean;
	setShowJoinRoom: (value: boolean) => void;
}) {
	const handleClick = () => {
		setShowJoinRoom(false);
	};

	if (!showJoinRoom) {
		return null;
	}
	return (
		<div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-80 bg-opacity-50 flex justify-center items-center z-50 transition duration-300">
			<div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-[90%]">
				<h1 className="text-xl font-semibold pb-3">Join Room</h1>
				<p className="text-gray-800 text-sm">Enter the code to join the room.</p>
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
