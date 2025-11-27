import { Skeleton } from '@/components/ui/skeleton'

export function StatsCardsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border bg-card p-6">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-8 w-20 mb-1" />
                    <Skeleton className="h-3 w-24" />
                </div>
            ))}
        </div>
    )
}
