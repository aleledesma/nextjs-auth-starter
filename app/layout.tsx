// app/layout.tsx
import "./globals.css"
import Header from "./Header"
import Providers from "./providers"

export const metadata = {
  title: "Superblog",
  description: "A blog app using Next.js and Prisma",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col bg-gray-50 text-[#333333]">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
