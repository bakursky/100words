import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "100 Words",
  description: "Write 100 words a day to learn the #1 habit for mental health",
  openGraph: {
    title: "100words.app",
    description: "Write 100 words a day to learn the #1 habit for mental health",
    url: "https://100words.app",
    siteName: "Your App Name",
    images: [
      {
        url: "/site-preview.png", // from /public
        width: 1200,
        height: 630,
        alt: "Preview image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "100words.app",
    description: "Write 100 words a day to learn the #1 habit for mental health",
    images: ["/site-preview.png"],
  },
};

export default function WelcomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </div>
  );
}

