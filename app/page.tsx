import ButtonModalTriggers from "./components/buttonModalTriggers";
import NavBar from "./components/navbar";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="w-full h-full flex flex-col content-center items-center">
				<div className="w-1/3 flex flex-col gap-3">
					<div className="text-center">
						<span className="text-4xl text-blue-600 font-bold">
							File Sharing
						</span>
						<span className="text-4xl text-blue-950 font-bold">
							, Simplified with SnapShare!
						</span>
					</div>
					<p className="text-center text-lg text-gray-800">
						With SnapShare, you can share high-quality files instantly across
						any device. No signups, no compression — just easy, instant
						transfers with zero compromise on quality. Start sharing files
						freely and securely today!
					</p>
					<ButtonModalTriggers />
				</div>
			</div>
		</>
	);
}
