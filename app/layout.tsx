import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import { CartProvider } from "./contexts/CartContext";
import { SearchProvider } from "./contexts/SearchContext";
import { WishlistProvider } from "./contexts/WishlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mega Mark",
  description: "Welcome to Mega Mark – your premier destination for the latest smartphones and electronics at the best prices! 💎📱💻 At Mega Mark, we offer a wide selection of the latest smartphones, smartwatches, tablets, and modern technology accessories from the best global brands. We are committed to providing 100% original products, certified warranties, and exclusive offers to suit your needs.",
  icons: {
    icon:"/Logo (2).webp",
  },
  other: {
    'content-security-policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent chrome extension errors
              if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onConnect) {
                chrome.runtime.onConnect.addListener(() => {});
              }
              // Suppress extension related console errors
              window.addEventListener('error', function(e) {
                if (e.filename && e.filename.includes('chrome-extension://')) {
                  e.preventDefault();
                  return false;
                }
              });
            `
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <Nav />
              {children}
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
