import type { Metadata } from "next";
import { Bai_Jamjuree, } from "next/font/google";
import "./globals.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeaderFooterLayout from "@/components/header-footer-layout";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "./contexts/userContext";
import { RouteGuard } from "@/components/routeGuard";


const baiJamjuree = Bai_Jamjuree({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700'], });


export const metadata: Metadata = {
  title: "Game Centric",
  description: "GAMECENTRIC, the platform by gamers for gamers, publishers, brands, and fans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="body" className={baiJamjuree.className}>
        <UserProvider>
          <RouteGuard>
            <HeaderFooterLayout>
              <main >
                {children}
              </main>
            </HeaderFooterLayout>
          </RouteGuard>
        </UserProvider>

        <Toaster />
      </body>
    </html>
  );
}
