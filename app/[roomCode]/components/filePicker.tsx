"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { isRoomValid, saveFiles } from "../_actions/actions";
import React, { Dispatch, SetStateAction } from "react";
import { FileDetails } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function FilePicker({
	roomCode,
	setFiles,
}: {
	roomCode: string;
	setFiles: Dispatch<SetStateAction<FileDetails[]>>;
}) {
	const router = useRouter();
	const [isUploading, setIsUploading] = React.useState(false);

	const parsedRoomCode = parseInt(roomCode);

	const verifyFileUpload = async (files: File[]) => {
		try {
			toast.loading("Checking room validity", { id: "room-validity" });
			const roomValid = await isRoomValid(parsedRoomCode);
			toast.dismiss("room-validity");

			if (roomValid) {
				return files;
			} else {
				toast.error("Room has expired");
				router.push("/");
				return [];
			}
		} catch (error) {
			toast.dismiss("room-validity");
			toast.error(`Error verifying room: ${error}`);
			return [];
		}
	};

	return (
		<main className="flex flex-col items-center justify-between my-8">
			<UploadDropzone
				endpoint="allFilesUploader"
				input={{ roomCode: parsedRoomCode }}
				onBeforeUploadBegin={verifyFileUpload}
				onUploadBegin={() => {
					setIsUploading(true);
					toast.loading("Uploading files...", { id: "upload-files" });
				}}
				onClientUploadComplete={async (res) => {
					try {
						if (res && res.length > 0) {
							console.log("Files: ", res);

							res.forEach((file) => {
								setFiles((prevValue) => [
									...prevValue,
									{
										roomCode: parsedRoomCode,
										name: file.name,
										mediaAccessLink: file.url,
										size: file.size,
										mediaId: file.key,
									},
								]);
							});

							await Promise.all(
								res.map((file) =>
									saveFiles(
										parsedRoomCode,
										file.url,
										file.name,
										file.size,
										file.key
									)
								)
							);

							toast.success("Files uploaded successfully");
						} else {
							toast.error("No files were uploaded.");
						}
					} catch (error) {
						toast.error(`Error processing files: ${error}`);
					} finally {
						toast.dismiss("upload-files");
						setIsUploading(false);
					}
				}}
				onUploadError={(error: Error) => {
					toast.dismiss("upload-files");
					toast.error(`Upload failed: ${error.message}`);
					setIsUploading(false);
				}}
				appearance={{
					label: {
						color: "#3b82f6",
					},
					container: {
						borderStyle: "dashed",
						borderWidth: "3px",
						width: "100%",
						maxWidth: "1260px",
						background: "#F5F5F5",
						backgroundColor: "rgba(245, 245, 245, 0.5)",
						cursor: "pointer",
					},
					button: {
						fontWeight: "500",
						backgroundColor: isUploading ? "#cbd5e1" : "#3b82f6", // Change button color when disabled
						cursor: isUploading ? "not-allowed" : "pointer", // Change cursor style
					},
				}}
			/>
		</main>
	);
}
