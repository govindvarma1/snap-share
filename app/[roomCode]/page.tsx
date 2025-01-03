"use client"; // Make sure this component is client-side

import React, { useState, useEffect } from "react";
import RoomTimer from "./components/roomTimer";
import RoomURL from "./components/roomURL";
import FilePicker from "./components/filePicker";
import { fetchFiles, getRoomDetails } from "./actions/actions";
import RoomPageSkeleton from "./loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FileCards from "./components/fileCards";
import { FileDetails, RoomDetails } from "@/utils/types";
import "../globals.css";
import { resolve } from "path";
import { RefreshCcw } from "lucide-react";

const RoomPage = ({ params }: { params: Promise<{ roomCode: string }> }) => {
	const [room, setRoom] = useState<RoomDetails | null>(null);
	const [files, setFiles] = useState<FileDetails[]>([]);
	const [areFilesRefreshing, setAreFilesRefreshing] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchRoomDetails = async () => {
			try {
				const { roomCode } = await params;
				const parsedRoomCode = parseInt(roomCode, 10);

				if (isNaN(parsedRoomCode)) {
					toast.error("Room doesn't exist");
					router.push("/");
					return;
				}

				const [roomDetails, fetchedFiles] = await Promise.all([
					getRoomDetails(parsedRoomCode),
					fetchFiles(parsedRoomCode),
				]);

				if (!roomDetails) {
					toast.error("Room doesn't exist");
					router.push("/");
					return;
				}

				const expiryTime = roomDetails.createdAt.getTime() + 15 * 60 * 1000;
				const currentTime = new Date().getTime();
				if (currentTime >= expiryTime) {
					toast.error("Room has expired");
					await new Promise((resolve) => {
						setTimeout(resolve, 500);
					});
					router.push("/");
					return;
				}
				setFiles(fetchedFiles);
				setRoom(roomDetails);
			} catch (error) {
				toast.error("An error occurred while fetching room details.");
				router.push("/");
			}
		};

		fetchRoomDetails();
	}, [params]);
	const refreshFiles = async () => {
		try {
			setAreFilesRefreshing(true);
			toast.loading("Refreshing files...");

			const { roomCode } = await params;
			const parsedRoomCode = parseInt(roomCode, 10);
			const fetchedFiles = await fetchFiles(parsedRoomCode);

			setFiles(fetchedFiles);
			setAreFilesRefreshing(false);
			toast.dismiss();
			toast.success("Files refreshed successfully.");
		} catch (error) {
			toast.dismiss();
			toast.error("Failed to refresh files. Please try again.");
			setAreFilesRefreshing(false);
		}
	};

	if (!room) {
		return <RoomPageSkeleton />;
	}

	return (
		<section className="app-bg min-h-screen">
			<div className="px-4 py-4 sm:px-12">
				<div className="flex flex-col w-full items-center my-4 gap-1">
					<h1 className="text-4xl font-black">SnapShare</h1>
					<RoomTimer createdAt={new Date(room.createdAt)} />
				</div>
				<div className="flex justify-center my-4">
					<RoomURL roomCode={room.roomCode} />
				</div>
				<FilePicker roomCode={room.roomCode.toString()} setFiles={setFiles} />
				<div className="my-4 flex justify-center items-center">
					<div className=" w-full max-w-[1260px]">
						<div className="flex w-full justify-between">
							<h1 className="text-3xl font-black">Uploaded Files</h1>
							<button disabled={areFilesRefreshing} onClick={refreshFiles}>
								<RefreshCcw
									className={`${
										areFilesRefreshing ? "animate-spin text-gray-600" : "text-gray-800"
									}`}
								/>
							</button>
						</div>
						<FileCards files={files} setFiles={setFiles} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default RoomPage;
