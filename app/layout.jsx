import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://github.com/syberke/BERKE_PORTOFOLIO"),
  title: "Berke Jaisyurrohman — Creative Developer",
  description:
    "Portfolio of Berke Jaisyurrohman, full-stack developer and IT student in Bekasi, Indonesia. Web, mobile, security and purposeful digital experiences.",
  openGraph: {
    title: "Berke Jaisyurrohman | Creative Developer",
    description: "Thoughtful code. Extraordinary digital experiences.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// Render selected theme before hydration to avoid a flash of the wrong palette.
const themeInit = `(function(){try{var theme=localStorage.getItem('berke-theme');document.documentElement.dataset.theme=(theme==='light'||theme==='dark')?theme:'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#08090d" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}