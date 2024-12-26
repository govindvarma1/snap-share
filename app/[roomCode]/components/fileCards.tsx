"use client";

import React, { useState } from "react";
import { LuDownload } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import JSZip from "jszip";

export default function FileCards({
	files,
}: {
	files: { name: string; url: string }[];
}) {
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
	const allFilesSelected = selectedFiles.length === files.length;

	const toggleFileSelection = (fileUrl: string) => {
		setSelectedFiles((prevSelected) =>
			prevSelected.includes(fileUrl)
				? prevSelected.filter((url) => url !== fileUrl)
				: [...prevSelected, fileUrl]
		);
	};

	const selectAllFiles = () => {
		setSelectedFiles(files.map((file) => file.url));
	};

	const deselectAllFiles = () => {
		setSelectedFiles([]);
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
		<div>
			<div className="actions flex items-center gap-4 my-4">
				<button onClick={selectAllFiles} className="font-semibold">
					Select All
				</button>
				<button onClick={deselectAllFiles} className="font-semibold">
					Deselect All
				</button>
				{/* <button
					onClick={downloadSelectedFiles}
					className="px-4 py-2 bg-green-500 text-white rounded"
					disabled={selectedFiles.length === 0}
				>
					Download Selected
				</button>
				<button
					onClick={downloadAsZip}
					className="px-4 py-2 bg-purple-500 text-white rounded"
					disabled={selectedFiles.length === 0}
				>
					Download as ZIP
				</button> */}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{files.map((file) => (
					<div
						key={file.url}
						className="file-card border border-gray-300 bg-white rounded p-4 flex items-center gap-4"
					>
						<input
							type="checkbox"
							checked={selectedFiles.includes(file.url)}
							onChange={() => toggleFileSelection(file.url)}
							className="checkbox"
						/>
						<div className="file-details flex flex-col">
							<p className="file-name font-semibold">{file.name}</p>
							<a
								href={file.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline"
							>
								View File
							</a>
						</div>
						<button
							onClick={() => downloadFile(file.url, file.name)}
							className="text-lg"
						>
							<LuDownload />
						</button>
						<button
							className="text-lg "
						>
							<MdOutlineDelete />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
