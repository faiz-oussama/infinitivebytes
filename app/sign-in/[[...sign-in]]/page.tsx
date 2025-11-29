import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SignInPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-background">
            <Link
                href="/"
                className="absolute left-4 top-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>
            <SignIn redirectUrl="/dashboard" />
        </div>
    )
}
