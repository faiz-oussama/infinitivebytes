import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SignUpPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-white">
            <Link
                href="/"
                className="absolute left-4 top-4 flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>
            <SignUp redirectUrl="/dashboard" />
        </div>
    )
}
