
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-scree flex flex-col">
        <nav className="h-30 "> 
        </nav>
        <main className="flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
