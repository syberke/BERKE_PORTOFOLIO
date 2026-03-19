import "./globals.css";

export const metadata = {
  title: "Berke Jaisyurrohman — Portfolio",
  description: "Full-Stack Developer · Web · Mobile · Cybersecurity · Bekasi, Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}