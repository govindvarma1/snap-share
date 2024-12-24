"use client";

import React from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

export default function RoomURL({ roomCode }: { roomCode: number }) {
	const URLText = `https://snapshareapp.vercel.app/${roomCode}`;
	const [isCopied, setIsCopied] = React.useState<boolean>(false);

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

	return (
		<div className="relative border-dashed border-gray-500 border-2 rounded-lg w-fit p-4">
			<div className="absolute inset-0 bg-gray-100 opacity-50 rounded-lg pointer-events-none"></div>
			<p className="font-semibold relative">Room Code: {roomCode.toString()}</p>
			<div className="flex gap-2 justify-center items-center relative">
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
			<div className="flex items-center justify-center mt-2 relative">
				<button className="text-red-500 font-semibold cursor-pointer hover:underline">
					Close Room
				</button>
			</div>
		</div>
	);
}
