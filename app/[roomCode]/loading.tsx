import React from "react";
import "@/app/globals.css";

const LoadingSkeleton: React.FC = () => {
	return (
		<div className="app-bg flex flex-col items-center justify-center min-h-screen">
			<div className="w-full max-w-4xl p-4 space-y-2 text-center">
				<div className="w-1/4 h-8 mx-auto bg-gray-300 rounded animate-pulse"></div>
				<div className="w-1/3 h-5 mx-auto bg-gray-300 rounded animate-pulse"></div>
			</div>

			{/* Room Info Section */}
			<div className="flex flex-col items-start w-5/6 max-w-[550px] m-4 px-4 py-6 space-y-4 border-dashed border-2 rounded-md shadow bg-white/70">
				<div className="w-1/2 h-5 bg-gray-300 rounded animate-pulse"></div>
				<div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
				<div className="flex w-full justify-center">
					<div className="w-1/5 h-4 bg-gray-300 rounded animate-pulse"></div>
				</div>
			</div>

			{/* File Upload Section */}
			<div className="flex flex-col items-center justify-center w-5/6 max-w-[1260px] py-20 mt-6 border-2 border-dashed rounded-lg bg-white/70">
				<div className="w-1/3 h-6 min-w-[250px] bg-gray-300 rounded animate-pulse"></div>
				<div className="w-1/4 h-4 min-w-[220px] mt-2 bg-gray-300 rounded animate-pulse"></div>
				<div className="w-36 h-8 mt-4 bg-gray-300 rounded animate-pulse"></div>
			</div>

			{/* File List Section */}
			<div className="w-5/6 max-w-[1260px] mt-8 space-y-4">
				{/* File Options */}
				<div className="flex flex-col gap-4">
					<div className="flex w-full justify-between">
						<div className="w-56 h-8 bg-gray-300 rounded animate-pulse"></div>
						<div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
					</div>
					<div className="flex gap-2">
						<div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
						<div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
					</div>
				</div>

				{/* File Entries */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-4 space-x-4 bg-white rounded shadow"
						>
							<div className="w-full flex justify-between items-center">
								<div className="flex flex-col w-1/2 gap-2">
									<div className="w-full h-5 bg-gray-300 rounded animate-pulse"></div>
									<div className="w-1/4 h-5 bg-gray-300 rounded animate-pulse"></div>
								</div>
								<div className="flex space-x-2">
									<div className="w-8 h-7 bg-gray-300 rounded animate-pulse"></div>
									<div className="w-8 h-7 bg-gray-300 rounded animate-pulse"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LoadingSkeleton;
