export default function CreateRoomModal({
	showCreateRoom,
	setShowCreateRoom,
}: {
	showCreateRoom: boolean;
	setShowCreateRoom: (value: boolean) => void;
}) {
    if(!showCreateRoom) {
        return null;
    }
    return (
        <div>
            <button onClick={() => {setShowCreateRoom(false)}}>Create</button>
            <button onClick={() => {setShowCreateRoom(false)}}>Cancel</button>
        </div>
    )
}
