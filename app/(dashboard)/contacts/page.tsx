import prisma from '@/lib/db'
import { getCurrentUserId, checkDailyLimit } from '@/lib/daily-limit'
import { ContactsTable } from '@/components/tables/contacts-table'
import { unstable_cache } from 'next/cache'

export const dynamic = 'force-dynamic'

const getContacts = unstable_cache(
    async (search: string, skip: number, perPage: number, filter: string, userId: string) => {
        const searchWhere = search
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

        // Build filter condition based on view status
        let filterWhere = {}
        if (filter === 'viewed') {
            filterWhere = {
                ContactView: {
                    some: {
                        user_id: userId,
                    },
                },
            }
        } else if (filter === 'unviewed') {
            filterWhere = {
                ContactView: {
                    none: {
                        user_id: userId,
                    },
                },
            }
        }

        const where = { ...searchWhere, ...filterWhere }

        return await Promise.all([
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
    },
    ['contacts'],
    { revalidate: 60, tags: ['contacts'] }
)


export default async function ContactsPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string; page?: string; filter?: string }>
}) {
    const params = await searchParams
    const search = params.search || ''
    const page = Number(params.page) || 1
    const filter = params.filter || 'all'
    const perPage = 15
    const skip = (page - 1) * perPage

    const userId = await getCurrentUserId()
    const { isAtLimit, viewsToday, remaining } = await checkDailyLimit(userId)

    const [contacts, total] = await getContacts(search, skip, perPage, filter, userId)
    const totalPages = Math.ceil(total / perPage)

    const viewedContacts = await prisma.contactView.findMany({
        where: { user_id: userId },
        select: { contact_id: true },
    })
    const viewedContactIds = viewedContacts.map((v) => v.contact_id)

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
                viewedContactIds={viewedContactIds}
                filter={filter}
            />
        </div>
    )
}
