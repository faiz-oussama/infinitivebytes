'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

type UpgradePromptProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    viewsToday: number
}

export function UpgradePrompt({ open, onOpenChange, viewsToday }: UpgradePromptProps) {
    const router = useRouter()

    const handleUpgrade = () => {
        onOpenChange(false)
        router.push('/pricing')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        Daily Limit Reached
                    </DialogTitle>
                    <DialogDescription>
                        You've reached your daily limit of 50 contact views
                    </DialogDescription>
                </DialogHeader>
                <Card className="border-amber-500/20 bg-amber-500/10 dark:bg-amber-500/5">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{viewsToday} / 50</p>
                                <p className="text-sm text-amber-600/80 dark:text-amber-400/80">Views used today</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-foreground">Upgrade to Premium for:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                        Unlimited contact views
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                        Advanced search filters
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                        Export capabilities
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex flex-col gap-2">
                    <Button onClick={handleUpgrade} className="w-full">
                        Upgrade Now
                    </Button>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
                        Maybe Later
                    </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                    Your limit will reset tomorrow at midnight UTC
                </p>
            </DialogContent>
        </Dialog>
    )
}
