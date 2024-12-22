"use client";

import React from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";
import { roomCreationStyle } from "../utils/toastStyles";

export default function RoomURL({ roomCode }: { roomCode: number }) {
	const URLText = `https://snapshareapp.vercel.app/${roomCode}`;
	const [isCopied, setIsCopied] = React.useState<boolean>(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(URLText);
			setIsCopied(true);
			toast.success("Copied to clipboard", roomCreationStyle);
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="border-dashed border-gray-500 border-2 rounded-lg w-fit px-4 py-4">
			<p className="font-semibold">Room Code: {roomCode.toString()}</p>
			<div className="flex gap-2 justify-center items-center">
				<p className="font-semibold">URL: {URLText}</p>
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
			<div className="flex items-center justify-center mt-2">
				<button
					// onClick={handleCloseRoom}
					className="text-red-500 font-semibold cursor-pointer hover:underline"
				>
					Close Room
				</button>
			</div>
		</div>
	);
}
