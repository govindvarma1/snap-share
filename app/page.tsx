import ButtonModalTriggers from "./components/buttonModalTriggers";
import Footer from "./components/footer";
import NavBar from "./components/navbar";

export const runtime = "nodejs";

export default function Home() {
	return (
		<>
			<div className="mx-4 mt-2 max-h-screen sm:mx-8 md:mx-16 lg:mx-32">
				<NavBar />
				<div className="min-h-[85svh] flex flex-col justify-center items-center w-full">
					<div className="flex flex-col gap-3 sm:w-9/12 md:w-8/12 lg:w-7/12">
						<h1 className="text-center">
							<span className="text-3xl text-blue-600 font-bold sm:text-4xl md:text-5xl ">
								File Sharing
							</span>
							<span className="text-3xl text-blue-950 font-bold sm:text-4xl md:text-5xl">
								, Simplified with SnapShare!
							</span>
						</h1>
						<p className="text-center text-md text-gray-600 sm:text-lg">
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
			<Footer />
		</>
	);
}
