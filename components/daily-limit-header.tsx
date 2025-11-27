import { getCurrentUserId, checkDailyLimit } from '@/lib/daily-limit'
import { Badge } from '@/components/ui/badge'

export async function DailyLimitHeader() {
    const userId = await getCurrentUserId()
    const { remaining } = await checkDailyLimit(userId)

    return (
        <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-muted-foreground hidden md:inline">
                Daily Views:
            </span>
            <Badge
                variant={remaining > 10 ? "secondary" : remaining > 0 ? "outline" : "destructive"}
                className="font-mono"
            >
                {remaining} / 50
            </Badge>
        </div>
    )
}
