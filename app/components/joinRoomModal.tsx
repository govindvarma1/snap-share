"use client";
import "@/app/components/styles/animations.css";
import React from "react";
import toast from "react-hot-toast";
import { roomCreationStyle } from "../utils/toastStyles";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function JoinRoomModal({
	showJoinRoom,
	setShowJoinRoom,
}: {
	showJoinRoom: boolean;
	setShowJoinRoom: (value: boolean) => void;
}) {
	const [isRoomJoining, setIsRoomJoining] = React.useState(false);
	const [roomCode, setRoomCode] = React.useState("");
	const [error, setError] = React.useState("");

	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRoomCode(event.target.value);
	};

	const handleClick = () => {
		setShowJoinRoom(false);
	};

	const validateRoomCode = () => {
		if (!/^\d{6}$/.test(roomCode)) {
			setError("Room code must be a 6-digit number.");
			return false;
		}
		setError("");
		return true;
	};

	const joinRoom = async () => {
		if (validateRoomCode()) {
			setIsRoomJoining(true);
			try {
				const response = await fetch("/api/joinRoom", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ roomCode: Number(roomCode) }),
				});

				const data = await response.json();

				console.log(data);

				if (!response.ok || !data?.success) {
					toast.error(data?.error || "Something went wrong", roomCreationStyle);
					return;
				}

				toast.success(
					"You will be redirected to the room shortly",
					roomCreationStyle
				);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				router.push(`/${roomCode}`);
			} catch (error) {
				console.error("Error joining room:", error);
				toast.error(
					"Failed to join room. Please try again later.",
					roomCreationStyle
				);
			} finally {
				setIsRoomJoining(false);
			}
		} else {
			toast.error("Invalid room code", roomCreationStyle);
		}
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
				<div className="w-full">
					<input
						type="number"
						placeholder="Enter room no."
						className="border-[1px] w-full bg-gray-50 p-1 rounded-sm"
						onChange={handleChange}
					/>
					{error && <div className="text-red-500 text-sm">{error}</div>}
				</div>
				<div className="flex gap-2 justify-end">
					<button
						className="px-2 py-1 border-[1px] rounded-sm border-blue-500 hover:bg-gray-100 text-blue-500 font-bold"
						onClick={handleClick}
					>
						Cancel
					</button>
					<button
						className="px-2 py-1 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-bold"
						onClick={joinRoom}
						disabled={isRoomJoining}
					>
						{isRoomJoining ? <Loader /> : <span>Join</span>}
					</button>
				</div>
			</div>
		</div>
	);
}
