"use client";

import React, { Dispatch, SetStateAction } from "react";
import { LuDownload } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import JSZip from "jszip";
import { formatBytes } from "@/app/utils/formatBytes";
import { FileDetails } from "@/utils/types";
import { deleteFile } from "../_actions/actions";
import DeleteFileModal from "./deleteFileModal";

export default function FileCards({ files, setFiles }: { files: FileDetails[], setFiles: Dispatch<SetStateAction<FileDetails[]>> }) {
	const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
	const [fileToDeleteID, setFileToDeleteID] = React.useState<string | null>(
		null
	);

	const toggleFileSelection = (fileUrl: string) => {
		setSelectedFiles((prevSelected) =>
			prevSelected.includes(fileUrl)
				? prevSelected.filter((url) => url !== fileUrl)
				: [...prevSelected, fileUrl]
		);
	};

	const selectAllFiles = () =>
		setSelectedFiles(files.map((file) => file.mediaAccessLink));
	const deselectAllFiles = () => setSelectedFiles([]);

	const deleteSingleFile = (mediaId: string) => {
		console.log("mediaId", mediaId);
		const updatedFiles = files.filter((file) => file.mediaId !== mediaId);
		setFiles(updatedFiles);
		setFileToDeleteID(null);
	};

	const downloadFile = (fileUrl: string, fileName: string) => {
		const anchor = document.createElement("a");
		anchor.href = fileUrl;
		anchor.download = fileName;
		anchor.click();
	};

	const downloadSelectedFiles = () => {
		if (selectedFiles.length === 0) {
			alert("No files selected for download");
			return;
		}
		selectedFiles.forEach((fileUrl) => {
			const fileName = fileUrl.split("/").pop() || "file";
			downloadFile(fileUrl, fileName);
		});
	};

	const downloadAsZip = async () => {
		if (selectedFiles.length === 0) {
			alert("No files selected for download");
			return;
		}
		const zip = new JSZip();
		const folder = zip.folder("Selected Files");

		await Promise.all(
			selectedFiles.map(async (fileUrl) => {
				const response = await fetch(fileUrl);
				const blob = await response.blob();
				const fileName = fileUrl.split("/").pop() || "file";
				folder?.file(fileName, blob);
			})
		);

		const zipBlob = await zip.generateAsync({ type: "blob" });
		const anchor = document.createElement("a");
		anchor.href = URL.createObjectURL(zipBlob);
		anchor.download = "selected-files.zip";
		anchor.click();
	};

	return (
		<>
			<div>
				<div className="flex w-full justify-between gap-4 my-2">
					{files.length > 0 ? (
						<div className="flex gap-2">
							<button
								onClick={selectAllFiles}
								className="text-gray-600 font-semibold"
							>
								Select All
							</button>
							<button
								onClick={deselectAllFiles}
								className="text-gray-600 font-semibold"
							>
								Deselect All
							</button>
						</div>
					) : (
						<p className="text-gray-600 font-semibold">No files uploaded yet</p>
					)}
					{selectedFiles.length > 0 && (
						<div className="flex gap-2">
							<button
								onClick={downloadSelectedFiles}
								className="px-2 py-1 bg-blue-500 text-white rounded"
								disabled={selectedFiles.length === 0}
							>
								Download Selected
							</button>
							<button
								onClick={downloadAsZip}
								className="px-2 py-1 bg-purple-500 text-white rounded"
								disabled={selectedFiles.length === 0}
							>
								Download as ZIP
							</button>
						</div>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{files.map((file) => (
						<div
							key={file.mediaAccessLink}
							className="border-[2px] border-gray-300 bg-white rounded-lg p-4 flex items-center gap-4"
						>
							<input
								type="checkbox"
								checked={selectedFiles.includes(file.mediaAccessLink)}
								onChange={() => toggleFileSelection(file.mediaAccessLink)}
								className="checkbox cursor-pointer"
							/>
							<div className="w-full">
								<div className="flex justify-between w-full">
									<p className="file-name font-semibold">
										{file.name.slice(0, 15)}
										{file.name.length > 15 && "..."}
									</p>
									<div className="flex gap-1">
										<button
											onClick={() =>
												downloadFile(file.mediaAccessLink, file.name)
											}
											className="text-lg"
										>
											<LuDownload />
										</button>
										<button
											className="text-lg"
											onClick={() => setFileToDeleteID(file.mediaId)}
										>
											<MdOutlineDelete />
										</button>
									</div>
								</div>
								<p className="text-sm">{formatBytes(file.size)}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{fileToDeleteID && (
				<DeleteFileModal
					fileToDeleteID={fileToDeleteID}
					setFileToDeleteID={setFileToDeleteID}
					deleteSingleFile={(mediaId) => {
						deleteSingleFile(mediaId);
					}}
				/>
			)}
		</>
	);
}
