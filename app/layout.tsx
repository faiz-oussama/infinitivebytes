import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { ClerkThemeProvider } from '@/components/clerk-theme-provider'
import './globals.css'
import './clerk.css'

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
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            {children}
            <Toaster position="top-right" richColors />
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
