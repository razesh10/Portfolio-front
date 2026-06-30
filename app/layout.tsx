import { Urbanist } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const urbanist = Urbanist({subsets:['latin'], variable:'--font-sans'},)


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", urbanist.variable, "font-sans")}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          {children}</ThemeProvider>
      </body>
    </html>
  )
}
