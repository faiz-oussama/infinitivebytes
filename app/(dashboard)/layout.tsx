import { UserButton } from '@clerk/nextjs'
import { DailyLimitHeader } from '@/components/daily-limit-header'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b">
                <div className="flex h-16 items-center px-4 md:px-8">
                    <div className="flex items-center gap-6 flex-1">
                        <Link href="/dashboard" className="text-lg font-semibold">
                            Dashboard
                        </Link>
                        <div className="flex gap-4">
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Overview
                            </Link>
                            <Link
                                href="/agencies"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Agencies
                            </Link>
                            <Link
                                href="/contacts"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Contacts
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Pricing
                            </Link>
                        </div>
                    </div>
                    <DailyLimitHeader />
                    <UserButton afterSignOutUrl="/sign-in" />
                </div>
            </nav>
            <main className="container mx-auto py-6 px-4 md:px-8">
                {children}
            </main>
        </div>
    )
}
