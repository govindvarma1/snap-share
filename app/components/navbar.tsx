import NavBarModalTriggers from "./navbarModalTriggers";

export default function NavBar() {
	return (
		<nav className="flex items-center justify-between">
		<div className="text-2xl font-bold">SnapShare</div>
		<div className="flex items-center space-x-4">
			<NavBarModalTriggers />
		</div>
		</nav>
	);
}
