import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata = {
  title: "Berke Jaisyurrohman | Full-Stack Developer",
  description:
    "Berke’s portfolio: web applications, mobile development, and security projects. Based in Bekasi, Indonesia. View project briefs, technical skills, and contact details.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('berke-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
