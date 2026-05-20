import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { AppChrome } from "@/components/layout/AppChrome";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "AGROPARTS | Професійні запчастини для тракторів",
  description: "Якісні комплектуючі для сільськогосподарської техніки з доставкою по всій Україні",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="dark">
      <body className={`${inter.variable} ${montserrat.variable} font-inter bg-black text-white`}>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
