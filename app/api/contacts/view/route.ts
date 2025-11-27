import { NextResponse } from 'next/server'
import { getCurrentUserId, checkDailyLimit, recordContactView } from '@/lib/daily-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const userId = await getCurrentUserId()
        const { contactId } = await request.json()

        if (!contactId) {
            return NextResponse.json(
                { error: 'Contact ID is required' },
                { status: 400 }
            )
        }

        const { isAtLimit } = await checkDailyLimit(userId)

        if (isAtLimit) {
            return NextResponse.json(
                { error: 'Daily limit reached' },
                { status: 429 }
            )
        }

        await recordContactView(userId, contactId)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error recording contact view:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
