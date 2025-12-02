import type { Metadata } from "next";
import { Geist, Geist_Mono, Shantell_Sans, Inria_Serif } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./context/ReactQueryProvider";
import NewEntry from "./components/NewEntry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shantell = Shantell_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-shantell',
  display: 'swap',
});

const inria = Inria_Serif({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
  variable: '--font-inria',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "100 Words",
  description: "Write 100 words a day to learn the #1 habit for mental health.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${shantell.variable} ${inria.variable} antialiased`}
    >


      <body>
        <ReactQueryProvider>
          <NewEntry />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}

