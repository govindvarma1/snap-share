"use client";

import React from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { deleteRoom } from "@/app/[roomCode]/actions/actions";

export default function RoomURL({ roomCode }: { roomCode: number }) {
	const URLText = `https://snapshareapp.vercel.app/${roomCode}`;
	const [isCopied, setIsCopied] = React.useState<boolean>(false);
	const [isButtonClicked, setIsButtonClicked] = React.useState<boolean>(false);

	const router = useRouter();

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(URLText);
			setIsCopied(true);
			toast.success("Copied to clipboard");
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteRoom = async () => {
		setIsButtonClicked(true);
		toast.loading("Deleting the room");
		try {
			const isRoomDeleted = await deleteRoom(roomCode);
			toast.dismiss();
			if(isRoomDeleted) {
				toast.success("Room deleted successfully");
			} else {
				toast.error('Room has already been deleted');
			}
			await new Promise((resolve) => setInterval(resolve, 500));
			router.push("/");
		} catch (error) {
			toast.dismiss();
			toast.error(`Error: ${error}`);
			router.push("/");
		}
	};

	return (
		<div className="relative border-dashed border-gray-500 border-2 rounded-lg w-fit py-4 px-2 sm:px-4">
			<div className="absolute inset-0 bg-gray-100 opacity-50 rounded-lg pointer-events-none"></div>
			<p className="font-semibold relative">Room Code: {roomCode.toString()}</p>
			<div className="flex justify-center items-center relative gap-1 sm:gap-2">
				<p className="font-semibold max-[400px]:text-xs max-[500px]:text-sm">
					URL: {URLText}
				</p>
				<button
					onClick={handleCopy}
					disabled={isCopied}
					className={`cursor-pointer ${
						isCopied ? "text-blue-500" : "hover:text-gray-500"
					}`}
				>
					<FaRegCopy />
				</button>
			</div>
			<div className="flex items-center justify-center mt-2 relative">
				<button
					className="text-red-500 font-semibold cursor-pointer hover:underline"
					onClick={handleDeleteRoom}
					disabled={isButtonClicked}
				>
					Close Room
				</button>
			</div>
		</div>
	);
}
