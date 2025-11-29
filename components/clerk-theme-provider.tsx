'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { ReactNode } from 'react'

export function ClerkThemeProvider({ children }: { children: ReactNode }) {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    return (
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: isDark ? '#e5e5e5' : '#212121',
                    colorBackground: isDark ? '#252525' : '#ffffff',
                    colorInputBackground: isDark ? '#353535' : '#ffffff',
                    colorInputText: isDark ? '#fafafa' : '#212121',
                    colorText: isDark ? '#fafafa' : '#212121',
                    colorTextSecondary: isDark ? '#b4b4b4' : '#8e8e8e',
                    colorDanger: '#ef4444',
                    borderRadius: '0.625rem',
                    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                }
            }}
        >
            {children}
        </ClerkProvider>
    )
}
