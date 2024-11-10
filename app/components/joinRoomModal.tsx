export default function JoinRoomModal({
	showJoinRoom,
	setShowJoinRoom,
}: {
	showJoinRoom: boolean;
	setShowJoinRoom: (value: boolean) => void;
}) {
    if(!showJoinRoom) {
        return null;
    }
    return (
        <div>
            <button onClick={() => {setShowJoinRoom(false)}}>Join</button>
            <button onClick={() => {setShowJoinRoom(false)}}>Cancel</button>
        </div>
    )
}
