import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { contactId } = await request.json()

        if (!contactId) {
            return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 })
        }

        const contact = await prisma.contact.findUnique({
            where: { id: contactId },
        })

        if (!contact) {
            return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
        }

        const existing = await prisma.savedContact.findUnique({
            where: {
                user_id_contact_id: {
                    user_id: userId,
                    contact_id: contactId,
                },
            },
        })

        if (existing) {
            return NextResponse.json({ message: 'Contact already saved' }, { status: 200 })
        }

        await prisma.savedContact.create({
            data: {
                user_id: userId,
                contact_id: contactId,
            },
        })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error saving contact:', error)
        return NextResponse.json(
            { error: 'Failed to save contact' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const contactId = searchParams.get('contactId')

        if (!contactId) {
            return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 })
        }

        await prisma.savedContact.deleteMany({
            where: {
                user_id: userId,
                contact_id: contactId,
            },
        })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error unsaving contact:', error)
        return NextResponse.json(
            { error: 'Failed to unsave contact' },
            { status: 500 }
        )
    }
}
