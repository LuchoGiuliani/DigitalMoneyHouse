import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AppProvider from "@/context/context";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Digital Money house",
  description: "Generado por lucho",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
      
        <link rel="icon" href="/logoNavegador.svg" type="image/x-icon" />
      </head>
      <body className={`${open_sans.className} flex flex-col min-h-screen`}>
        <AppProvider>
         
          <Navbar />
          <main className="flex-grow  ">{children}</main>
          <Footer />
      
        </AppProvider>
      </body>
    </html>
  );
}
