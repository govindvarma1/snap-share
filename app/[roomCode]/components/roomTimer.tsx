"use client";
import React from "react";
import formatTime from "@/app/utils/formatTime";

export default function RoomTimer({ createdAt }: { createdAt: Date }) {
	const [timeLeft, setTimeLeft] = React.useState<number>(0);

	React.useEffect(() => {
		const expirationTime = new Date(createdAt).getTime() + 15 * 60 * 1000;

		const updateTimeLeft = () => {
			const now = new Date().getTime();
			const remainingTime = Math.max(expirationTime - now, 0);
			setTimeLeft(remainingTime);
		};

		updateTimeLeft();

		const interval = setInterval(updateTimeLeft, 1000);

		return () => clearInterval(interval);
	}, [createdAt]);

	return (
		<p className="font-semibold text-gray-600 text-lg">
			{timeLeft > 0
				? `This room expires in: ${formatTime(timeLeft)}`
				: `The is scheduled for deletion`}
		</p>
	);
}
