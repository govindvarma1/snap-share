"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import toast from "react-hot-toast";

export default function FilePicker({ roomCode }: { roomCode: string }) {
	return (
		<main className="flex flex-col items-center justify-between m-8">
			<UploadDropzone
				endpoint="allFilesUploader"
				input={{ roomCode: parseInt(roomCode) }}
				onUploadBegin={() => {
					toast.loading("uploading files...", {id: "upload-files"} );
				}}
				onClientUploadComplete={(res) => {
					toast.dismiss();
					console.log("Files: ", res);
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
