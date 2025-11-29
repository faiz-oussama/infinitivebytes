import { UserButton } from '@clerk/nextjs'
import { DailyLimitHeader } from '@/components/daily-limit-header'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <div className="fixed z-50 pt-4 md:pt-6 top-0 left-0 w-full bg-background/80 backdrop-blur-sm border-b">
                <header className="flex items-center justify-between container mx-auto px-4 md:px-8 pb-4">
                    <Link href="/dashboard">
                        <Logo className="w-[50px] md:w-[60px] text-foreground" />
                    </Link>
                    <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
                        {[
                            { name: "Overview", href: "/dashboard" },
                            { name: "Agencies", href: "/agencies" },
                            { name: "Contacts", href: "/contacts" },
                            { name: "Saved", href: "/saved" },
                        ].map((item) => (
                            <Link
                                className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
                                href={item.href}
                                key={item.name}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4">
                        <DailyLimitHeader />
                        <ThemeToggle />
                        <UserButton
                            afterSignOutUrl="/sign-in"
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10"
                                }
                            }}
                        />
                    </div>
                </header>
            </div>
            <main className="container mx-auto py-6 px-4 md:px-8 pt-28">
                {children}
            </main>
        </div>
    )
}
