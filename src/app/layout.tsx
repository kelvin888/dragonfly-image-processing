import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Providers from "@/utils/provider";
import "./globals.css";

const lexend = Lexend({
  subsets: ['latin'],
  display: "swap",
  variable: '--font-lexend',
})
export const metadata: Metadata = {
  title: "Image Processing App",
  description: "Dragonfly Image processing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.className} bg-app-bg bg-cover min-h-screen relative`}>
        <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-[10rem] w-full max-w-[40rem]">
          <h1 className="text-3xl mb-3 text-center text-primary-900 drop-shadow-2xl">Dragonfly Image Processing</h1>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Providers>
              {children}
            </Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
