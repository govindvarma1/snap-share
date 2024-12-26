import React from "react";
import '@/app/globals.css'

const LoadingSkeleton: React.FC = () => {
	return (
		<div className="app-bg flex flex-col items-center justify-center min-h-screen">
			<div className="w-full max-w-4xl p-4 space-y-2 text-center">
				<div className="w-1/3 h-8 mx-auto bg-gray-300 rounded animate-pulse"></div>
				<div className="w-2/3 h-5 mx-auto bg-gray-300 rounded animate-pulse"></div>
			</div>

			{/* Room Info Section */}
			<div className="flex flex-col items-center w-full max-w-4xl px-4 py-6 space-y-4 border rounded-md shadow bg-white/80">
				<div className="w-1/2 h-5 bg-gray-300 rounded animate-pulse"></div>
				<div className="flex flex-col items-center w-full space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
					<div className="w-1/4 h-4 bg-gray-300 rounded animate-pulse"></div>
					<div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
					<div className="w-1/6 h-8 bg-gray-300 rounded animate-pulse"></div>
				</div>
			</div>

			{/* File Upload Section */}
			<div className="flex flex-col items-center justify-center w-full max-w-4xl p-6 mt-6 border-2 border-dashed rounded-md bg-white/80">
				<div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
				<div className="w-1/4 h-10 mt-4 bg-gray-300 rounded animate-pulse"></div>
			</div>

			{/* File List Section */}
			<div className="w-full max-w-4xl mt-8 space-y-4">
				{/* File Options */}
				<div className="flex justify-center space-x-4">
					<div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
					<div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
				</div>

				{/* File Entries */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-4 space-x-4 bg-gray-100 rounded shadow"
						>
							<div className="w-3/4 h-5 bg-gray-300 rounded animate-pulse"></div>
							<div className="flex space-x-2">
								<div className="w-16 h-6 bg-gray-300 rounded animate-pulse"></div>
								<div className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LoadingSkeleton;
