import prisma from '@/lib/db'
import { AgenciesTable } from '@/components/tables/agencies-table'

export const dynamic = 'force-dynamic'

export default async function AgenciesPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string; page?: string }>
}) {
    const params = await searchParams
    const search = params.search || ''
    const page = Number(params.page) || 1
    const perPage = 20
    const skip = (page - 1) * perPage

    const where = search
        ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { state: { contains: search, mode: 'insensitive' as const } },
                { type: { contains: search, mode: 'insensitive' as const } },
                { county: { contains: search, mode: 'insensitive' as const } },
            ],
        }
        : {}

    const [agencies, total] = await Promise.all([
        prisma.agency.findMany({
            where,
            skip,
            take: perPage,
            orderBy: { name: 'asc' },
        }),
        prisma.agency.count({ where }),
    ])

    const totalPages = Math.ceil(total / perPage)

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Agencies</h1>
                <p className="text-muted-foreground">
                    View and search through all agencies
                </p>
            </div>
            <AgenciesTable
                agencies={agencies}
                currentPage={page}
                totalPages={totalPages}
                searchQuery={search}
            />
        </div>
    )
}
