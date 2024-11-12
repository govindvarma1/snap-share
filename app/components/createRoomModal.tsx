export default function CreateRoomModal({
	showCreateRoom,
	setShowCreateRoom,
}: {
	showCreateRoom: boolean;
	setShowCreateRoom: (value: boolean) => void;
}) {
	if (!showCreateRoom) {
		return null;
	}
	return (
		<div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-80 bg-opacity-50 flex items-center justify-center z-50 transition duration-300">
			<div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
				<div className="flex justify-between items-center pb-3">
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
						onClick={() => {
							setShowCreateRoom(false);
						}}
						className="bg-white border-[1px] hover:bg-gray-100 text-blue-500 border-blue-500 font-semibold py-1 px-2 rounded"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							setShowCreateRoom(false);
						}}
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
