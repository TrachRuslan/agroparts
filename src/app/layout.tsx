import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { AppChrome } from "@/components/layout/AppChrome";
import { getCatalogSnapshot } from "@/lib/catalog/data";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "AGROPARTS | Професійні запчастини для тракторів",
  description: "Якісні комплектуючі для сільськогосподарської техніки з доставкою по всій Україні",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = await getCatalogSnapshot()

  return (
    <html lang="uk" className="dark">
      <body className={`${inter.variable} ${montserrat.variable} font-inter bg-black text-white`}>
        <AppChrome catalog={catalog}>{children}</AppChrome>
      </body>
    </html>
  );
}
