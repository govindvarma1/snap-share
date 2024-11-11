import ButtonModalTriggers from "./components/buttonModalTriggers";
import NavBar from "./components/navbar";

export default function Home() {
	return (
		<div className="mx-4 my-2 sm:mx-8 md:mx-16 lg:mx-32">
			<NavBar />
			<div className="min-h-[90svh] flex flex-col justify-center items-center w-full">
				<div className="flex flex-col gap-3 sm:w-3/4 md:w-1/2 lg:w-1/3">
					<h1 className="text-center">
						<span className="text-2xl text-blue-600 font-bold sm:text-3xl md:text-4xl ">
							File Sharing
						</span>
						<span className="text-2xl text-blue-950 font-bold sm:text-3xl md:text-4xl">
							, Simplified with SnapShare!
						</span>
					</h1>
					<p className="text-center text-lg text-gray-800">
						With SnapShare, you can share high-quality files instantly across
						any device. No signups, no compression — just easy, instant
						transfers with zero compromise on quality. Start sharing files
						freely and securely today!
					</p>
					<div className="mt-4">
						<ButtonModalTriggers />
					</div>
				</div>
			</div>
		</div>
	);
}
