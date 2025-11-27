'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-[60vh] items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <CardTitle>Dashboard Error</CardTitle>
                    </div>
                    <CardDescription>
                        Unable to load dashboard data. This might be a temporary issue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={reset} className="w-full">
                        Retry
                    </Button>
                    <Link href="/agencies" className="block">
                        <Button variant="outline" className="w-full">
                            Back to Dashboard
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
