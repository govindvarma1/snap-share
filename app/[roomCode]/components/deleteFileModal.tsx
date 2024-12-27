"use client";

import "@/app/components/styles/animations.css";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { deleteFile } from "../_actions/actions";
import { LoaderCircle } from "lucide-react";

export default function DeleteFileModal({
	fileToDeleteID,
	setFileToDeleteID,
	deleteSingleFile,
}: {
	fileToDeleteID: string;
	setFileToDeleteID: (value: string | null) => void;
	deleteSingleFile: (value: string) => void;
}) {
	const [isFileDeleting, setIsFileDeleting] = React.useState(false);

	const closeModal = () => {
		setFileToDeleteID(null);
	};

	const fileDelete = async () => {
		setIsFileDeleting(true);
		try {
			await deleteFile(fileToDeleteID);
			deleteSingleFile(fileToDeleteID);
		} catch (error) {
			toast.error(`${error}`);
			setIsFileDeleting(false);
		}
	};

	if (!fileToDeleteID) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 backdrop-blur-sm backdrop-brightness-80 bg-opacity-50 flex items-center justify-center z-50 transition duration-300"
			onClick={closeModal}
		>
			<div
				className="bg-white flex flex-col gap-3 rounded-lg shadow-lg p-6 w-full max-w-[90%] sm:max-w-md animate-pop-out"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">Delete File</h2>
				</div>
				<div>
					<p className="text-gray-800 text-sm">
						Are you sure you want to delete this file? This action cannot be
						undone.
					</p>
				</div>
				<div className="flex justify-end gap-2">
					<button
						onClick={closeModal}
						className="bg-white border-[1px] hover:bg-gray-100 text-blue-500 border-blue-500 font-semibold py-1 px-2 rounded"
					>
						Cancel
					</button>
					<button
						onClick={fileDelete}
						className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded`}
						disabled={isFileDeleting}
					>
						{isFileDeleting ? (
							<LoaderCircle className="animate-spin" />
						) : (
							"Delete"
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
