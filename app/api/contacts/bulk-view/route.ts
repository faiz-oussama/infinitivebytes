import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getCurrentUserId } from '@/lib/daily-limit'

export async function POST(request: Request) {
    try {
        const userId = await getCurrentUserId()
        const { contactIds } = await request.json()

        if (!Array.isArray(contactIds) || contactIds.length === 0) {
            return NextResponse.json(
                { error: 'Invalid contact IDs' },
                { status: 400 }
            )
        }

        // Check current views today
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const viewsToday = await prisma.contactView.count({
            where: {
                user_id: userId,
                viewed_at: {
                    gte: today,
                },
            },
        })

        // Check if bulk operation would exceed daily limit
        if (viewsToday + contactIds.length > 50) {
            return NextResponse.json(
                {
                    error: 'Daily limit reached',
                    viewsToday,
                    requested: contactIds.length,
                    remaining: Math.max(0, 50 - viewsToday),
                },
                { status: 403 }
            )
        }

        // Filter out contacts that have already been viewed by this user
        const existingViews = await prisma.contactView.findMany({
            where: {
                user_id: userId,
                contact_id: {
                    in: contactIds,
                },
            },
            select: {
                contact_id: true,
            },
        })

        const alreadyViewedIds = new Set(existingViews.map((v) => v.contact_id))
        const contactsToView = contactIds.filter((id) => !alreadyViewedIds.has(id))

        if (contactsToView.length === 0) {
            return NextResponse.json({
                message: 'All selected contacts have already been viewed',
                viewsToday,
                newViews: 0,
            })
        }

        // Create view records in a transaction
        const newViews = await prisma.$transaction(
            contactsToView.map((contactId) =>
                prisma.contactView.create({
                    data: {
                        user_id: userId,
                        contact_id: contactId,
                    },
                })
            )
        )

        const updatedViewsToday = viewsToday + newViews.length

        return NextResponse.json({
            message: `Successfully viewed ${newViews.length} contact(s)`,
            viewsToday: updatedViewsToday,
            newViews: newViews.length,
            skipped: contactIds.length - newViews.length,
        })
    } catch (error) {
        console.error('Error in bulk view:', error)
        return NextResponse.json(
            { error: 'Failed to view contacts' },
            { status: 500 }
        )
    }
}
