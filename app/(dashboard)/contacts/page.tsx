import prisma from '@/lib/db'
import { getCurrentUserId, checkDailyLimit } from '@/lib/daily-limit'
import { ContactsTable } from '@/components/tables/contacts-table'


export const dynamic = 'force-dynamic'

export default async function ContactsPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string; page?: string }>
}) {
    const params = await searchParams
    const search = params.search || ''
    const page = Number(params.page) || 1
    const perPage = 20
    const skip = (page - 1) * perPage

    const userId = await getCurrentUserId()
    const { isAtLimit, viewsToday, remaining } = await checkDailyLimit(userId)

    const where = search
        ? {
            OR: [
                { first_name: { contains: search, mode: 'insensitive' as const } },
                { last_name: { contains: search, mode: 'insensitive' as const } },
                { email: { contains: search, mode: 'insensitive' as const } },
                { title: { contains: search, mode: 'insensitive' as const } },
                { department: { contains: search, mode: 'insensitive' as const } },
            ],
        }
        : {}

    const [contacts, total] = await Promise.all([
        prisma.contact.findMany({
            where,
            skip,
            take: perPage,
            orderBy: { first_name: 'asc' },
            include: {
                agency: {
                    select: {
                        name: true,
                    },
                },
            },
        }),
        prisma.contact.count({ where }),
    ])

    const totalPages = Math.ceil(total / perPage)

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
                <p className="text-muted-foreground">
                    View contact information (limited to 50 views per day)
                </p>
            </div>

            <ContactsTable
                contacts={contacts}
                currentPage={page}
                totalPages={totalPages}
                searchQuery={search}
                userId={userId}
                viewsToday={viewsToday}
                isAtLimit={isAtLimit}
            />
        </div>
    )
}
