import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/db'

export async function checkDailyLimit(userId: string): Promise<{
    isAtLimit: boolean
    viewsToday: number
    remaining: number
}> {
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

    const limit = 50
    const remaining = Math.max(0, limit - viewsToday)
    const isAtLimit = viewsToday >= limit

    return { isAtLimit, viewsToday, remaining }
}

export async function recordContactView(userId: string, contactId: string) {
    // Check if user exists in our database
    const user = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!user) {
        // Get user details from Clerk
        const clerkUser = await currentUser()
        if (!clerkUser) {
            throw new Error('User not found in Clerk')
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress
        if (!email) {
            throw new Error('User has no email address')
        }

        // Create user in our database
        await prisma.user.create({
            data: {
                id: userId,
                email: email,
                name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
            },
        })
    }

    await prisma.contactView.create({
        data: {
            user_id: userId,
            contact_id: contactId,
        },
    })
}

export async function getCurrentUserId() {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')
    return userId
}
