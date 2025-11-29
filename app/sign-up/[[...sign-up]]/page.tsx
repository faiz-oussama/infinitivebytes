import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SignUpPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-background">
            <Link
                href="/"
                className="absolute left-4 top-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>
            <SignUp
                redirectUrl="/dashboard"
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-card shadow-lg border border-border rounded-lg",
                        headerTitle: "text-2xl font-semibold text-foreground",
                        headerSubtitle: "text-sm text-muted-foreground",
                        socialButtonsBlockButton: "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
                        socialButtonsBlockButtonText: "text-secondary-foreground font-medium",
                        dividerLine: "bg-border",
                        dividerText: "text-muted-foreground",
                        formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
                        formFieldInput: "bg-background border-input text-foreground rounded-md focus:ring-2 focus:ring-ring focus:border-ring",
                        formFieldLabel: "text-foreground font-medium",
                        footerActionLink: "text-primary hover:text-primary/80",
                        identityPreviewText: "text-foreground",
                        identityPreviewEditButton: "text-primary hover:text-primary/80",
                        formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
                        otpCodeFieldInput: "border-input text-foreground",
                        formResendCodeLink: "text-primary hover:text-primary/80",
                        footerActionText: "text-muted-foreground",
                        formFieldErrorText: "text-destructive",
                        alertText: "text-destructive",
                        formHeaderTitle: "text-foreground",
                        formHeaderSubtitle: "text-muted-foreground"
                    },
                    layout: {
                        socialButtonsPlacement: "bottom",
                        socialButtonsVariant: "blockButton",
                    },
                    variables: {
                        colorPrimary: "hsl(var(--primary))",
                        colorBackground: "hsl(var(--background))",
                        colorInputBackground: "hsl(var(--background))",
                        colorInputText: "hsl(var(--foreground))",
                        colorText: "hsl(var(--foreground))",
                        colorTextSecondary: "hsl(var(--muted-foreground))",
                        colorDanger: "hsl(var(--destructive))",
                        borderRadius: "0.625rem",
                        fontFamily: "var(--font-geist-sans), sans-serif",
                    }
                }}
            />
        </div>
    )
}
