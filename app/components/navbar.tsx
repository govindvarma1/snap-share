import NavBarModalTriggers from "./navbarModalTriggers";

export default function NavBar() {
	return (
		<nav className="flex items-center justify-between">
			<div className="text-xl font-bold sm:text-2xl md:text-3xl">SnapShare</div>
			<NavBarModalTriggers />
		</nav>
	);
}
