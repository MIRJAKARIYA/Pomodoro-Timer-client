"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./redux-toolkit/provider";
// import Navbar from "./components/Navbar";
import dynamic from "next/dynamic";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const Navbar = dynamic(()=>{
  return import("@/app/components/Navbar")
},{ssr:false})
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>     
          <Navbar></Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
