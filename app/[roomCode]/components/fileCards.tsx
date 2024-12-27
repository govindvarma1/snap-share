"use client";

import React, { Dispatch, SetStateAction } from "react";
import { LuDownload } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import JSZip from "jszip";
import { formatBytes } from "@/app/utils/formatBytes";
import { FileDetails } from "@/utils/types";
import DeleteFileModal from "./deleteFileModal";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

export default function FileCards({
	files,
	setFiles,
}: {
	files: FileDetails[];
	setFiles: Dispatch<SetStateAction<FileDetails[]>>;
}) {
	const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
	const [fileToDeleteID, setFileToDeleteID] = React.useState<string | null>(
		null
	);
	const [isFileDownloading, setIsFileDownloading] =
		React.useState<boolean>(false);

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

	const deleteSelectedFiles = async () => {
		console.log("Delete selected");
	};

	const downloadSingleFile = async (fileUrl: string, fileName: string) => {
		try {
			toast.loading("File being downloaded...");
			const response = await fetch(fileUrl);

			const blob = await response.blob(); // Get file as a Blob
			const url = window.URL.createObjectURL(blob); // Create a URL for the Blob

			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.setAttribute("download", fileName);
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);
			toast.dismiss();
			toast.success("file downloaded successfully");
		} catch (error) {
			toast.dismiss();
			toast.error(`${error}`);
			console.error("Error downloading file:", error);
		}
	};

	const downloadSelectedFiles = async () => {
		setIsFileDownloading(true);
		try {
			toast.loading("Preparing files for download...");
			const zip = new JSZip();
			const folder = zip.folder("Downloaded_Files");

			await Promise.all(
				selectedFiles.map(async (url) => {
					const fileDetail = files.find((file) => file.mediaAccessLink === url);
					if (!fileDetail) {
						throw new Error(`File name not found for URL: ${url}`);
					}

					const response = await fetch(url);
					if (!response.ok) {
						throw new Error(
							`Failed to fetch file: ${fileDetail.mediaAccessLink}`
						);
					}
					const blob = await response.blob();
					folder?.file(fileDetail.name, blob);
				})
			);

			const zipBlob = await zip.generateAsync({ type: "blob" });
			const zipUrl = window.URL.createObjectURL(zipBlob);

			const anchor = document.createElement("a");
			anchor.href = zipUrl;
			anchor.setAttribute("download", "SnapShare-app-files.zip");
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);

			window.URL.revokeObjectURL(zipUrl);
			toast.dismiss();
			toast.success("ZIP file downloaded successfully!");
		} catch (error) {
			console.error("Error creating ZIP file:", error);
			toast.dismiss();
			toast.error("Failed to download ZIP file. Please try again.");
		} finally {
			setIsFileDownloading(false);
		}
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
							{/* <button
								onClick={deleteSelectedFiles}
								className="px-2 py-1 bg-red-500 text-white rounded"
								disabled={selectedFiles.length === 0}
							>
								Delete Selected
							</button> */}
							<button
								onClick={downloadSelectedFiles}
								className="px-2 py-1 bg-blue-500 text-white rounded"
								disabled={isFileDownloading}
							>
								{isFileDownloading ? (
									<LoaderCircle className="animate-spin" />
								) : (
									"Download as ZIP"
								)}
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
												downloadSingleFile(file.mediaAccessLink, file.name)
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
