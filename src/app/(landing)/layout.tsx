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

