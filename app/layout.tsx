import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SnapShare - Effortless File Sharing",
	description:
		"Share files securely and quickly with SnapShare. Generate room codes and share files seamlessly without hassle.",
	keywords: [
		"SnapShare",
		"file sharing",
		"secure file sharing",
		"quick sharing",
		"room codes",
		"file transfer",
	],
	openGraph: {
		title: "SnapShare - Secure File Sharing",
		description:
			"SnapShare lets you share files securely with unique room codes. No account needed—just fast, seamless file transfers.",
		url: "https://snapshareapp.vercel.app",
		siteName: "SnapShare",
		locale: "en_US",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				{children}
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				<Toaster
					position="bottom-left"
					toastOptions={{
						style: {
							border: "1px solid #3b82f6",
							padding: "16px",
							color: "#3b82f6",
						},
						iconTheme: {
							primary: "#3b82f6",
							secondary: "#FFFAEE",
						},
					}}
				/>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
