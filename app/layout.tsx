import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agency Insights',
  description: 'Professional agency insights dashboard application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
