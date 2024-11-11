"use client"
import { Github } from "lucide-react";

export default function Footer() {
	const openLinkedIn = () => {
		window.open("https://www.linkedin.com/in/govindvarma1/", "_blank");
	};

	const openGitHubRepo = () => {
		window.open("https://github.com/govindvarma1/snap-share", "_blank");
	};

	return (
		<footer className="p-4 w-full absolute bottom-0 mb-0 bg-slate-800 flex justify-between sm:px-8 md:px-16 lg:px-32">
			<h1 className="text-white">
				Created by{" "}
				<button
					className="font-semibold text-white hover:scale-[1.01] transition duration-300 cursor-pointer"
					onClick={openLinkedIn}
					aria-label="Open LinkedIn profile of Govinda Varma"
				>
					Govinda Varma
				</button>
			</h1>
			<button
				onClick={openGitHubRepo}
				aria-label="Open GitHub repository for SnapShare"
				className="cursor-pointer hover:scale-[1.01] transition duration-300"
			>
				<Github color="white" />
			</button>
		</footer>
	);
}
