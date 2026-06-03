import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mithila Vidyapith Bhawan Library",
  description: "Library Management System for Mithila Vidyapith Bhawan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Official Government Top Bar */}
        <div style={{ backgroundColor: '#002147', color: 'white', padding: '6px 20px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>🇮🇳 Government of Bihar</span> | <span>Department of Art, Culture and Youth</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ cursor: 'pointer' }}>A- A A+</span>
            <div id="google_translate_element" style={{ color: 'black', minWidth: '120px' }}></div>
          </div>
        </div>

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement({
                pageLanguage: 'en', 
                includedLanguages: 'hi,en',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
        />

        <header className="header pattern-border-top">
          <div className="container header-content">
            <Link href="/" className="logo">
              📚 <span>Mithila Vidyapith Library</span>
            </Link>
            <nav>
              <Link href="/admin" className="btn btn-outline">Admin Panel</Link>
            </nav>
          </div>
        </header>
        <main style={{ minHeight: "80vh" }}>
          {children}
        </main>
        <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "var(--color-sand)", marginTop: "40px" }}>
          <p>© {new Date().getFullYear()} Mithila Vidyapith Bhawan. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
