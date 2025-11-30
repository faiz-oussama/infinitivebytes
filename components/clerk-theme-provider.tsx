'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

export function ClerkThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: '#212121',
                    colorBackground: '#ffffff',
                    colorInputBackground: '#ffffff',
                    colorInputText: '#212121',
                    colorText: '#212121',
                    colorTextSecondary: '#8e8e8e',
                    colorDanger: '#ef4444',
                    colorShimmer: 'rgba(0, 0, 0, 0.05)',
                    colorNeutral: '#e5e5e5',
                    borderRadius: '0.625rem',
                    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                }
            }}
        >
            {children}
        </ClerkProvider>
    )
}
