"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const routes = [
        { name: "Overview", href: "/dashboard" },
        { name: "Agencies", href: "/agencies" },
        { name: "Contacts", href: "/contacts" },
        { name: "Saved", href: "/saved" },
    ]

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 py-4">
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <Logo className="w-[50px] text-foreground" />
                    </Link>
                    <nav className="flex flex-col gap-4">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={() => setOpen(false)}
                                className={`text-lg font-medium transition-colors hover:text-primary ${pathname === route.href
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                    }`}
                            >
                                {route.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    )
}
