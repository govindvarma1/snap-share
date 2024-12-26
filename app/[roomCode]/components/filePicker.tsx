"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { isRoomValid, saveFiles } from "../_actions/actions";
import { Dispatch, SetStateAction } from "react";

export default function FilePicker({
	roomCode,
	setFiles,
}: {
	roomCode: string;
	setFiles: Dispatch<SetStateAction<{ name: string; url: string }[]>>;
}) {
	const verifyFileUpload = async (files: File[]) => {
		try {
			const roomValid = await isRoomValid(parseInt(roomCode));
			if (roomValid) {
				return files;
			} else {
				toast.error("Room has expired");
				return [];
			}
		} catch (error) {
			toast.error(`Error: ${error}`);
			return [];
		}
	};

	return (
		<main className="flex flex-col items-center justify-between my-8">
			<UploadDropzone
				endpoint="allFilesUploader"
				input={{ roomCode: parseInt(roomCode) }}
				onBeforeUploadBegin={(files) => verifyFileUpload(files)}
				onUploadBegin={() => {
					toast.loading("uploading files...", { id: "upload-files" });
				}}
				onClientUploadComplete={async (res) => {
					console.log("Files: ", res);
					res.forEach((file) => {
						setFiles((prevValue) => [
							...prevValue,
							{ name: file.name, url: file.url },
						]);
					});
					await Promise.all(
						res.map((file) => {
							saveFiles(
								parseInt(roomCode),
								file.url,
								file.name,
								file.size,
								file.key
							);
						})
					);
					toast.dismiss();
					toast.success("Files uploaded successfully");
				}}
				onUploadError={(error: Error) => {
					toast.dismiss();
					toast.error(`ERROR! ${error.message}`);
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
						backgroundColor: "#3b82f6",
					},
				}}
			/>
		</main>
	);
}
