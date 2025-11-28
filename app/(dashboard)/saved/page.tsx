import prisma from '@/lib/db'
import { getCurrentUserId } from '@/lib/daily-limit'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Mail, Phone, Building2, Briefcase } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SavedContactsPage() {
    const userId = await getCurrentUserId()

    const savedContacts = await prisma.savedContact.findMany({
        where: { user_id: userId },
        include: {
            contact: {
                include: {
                    agency: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: { saved_at: 'desc' },
    })

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Saved Contacts</h1>
                <p className="text-muted-foreground">
                    Your saved contacts ({savedContacts.length})
                </p>
            </div>

            {savedContacts.length === 0 ? (
                <Card>
                    <CardContent className="pt-6 text-center">
                        <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">No saved contacts yet</p>
                        <p className="text-sm text-muted-foreground">
                            Save contacts from the contacts page to see them here
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {savedContacts.map(({ contact, saved_at }) => {
                        const fullName = [contact.first_name, contact.last_name]
                            .filter(Boolean)
                            .join(' ') || 'Unknown'

                        return (
                            <Card key={contact.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">{fullName}</CardTitle>
                                            {contact.title && (
                                                <CardDescription className="flex items-center gap-1">
                                                    <Briefcase className="h-3 w-3" />
                                                    {contact.title}
                                                </CardDescription>
                                            )}
                                        </div>
                                        <Badge variant="secondary" className="gap-1">
                                            <Star className="h-3 w-3 fill-current" />
                                            Saved
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    {contact.email && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">
                                                {contact.email}
                                            </a>
                                        </div>
                                    )}
                                    {contact.phone && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="h-4 w-4" />
                                            <a href={`tel:${contact.phone}`} className="hover:text-foreground transition-colors">
                                                {contact.phone}
                                            </a>
                                        </div>
                                    )}
                                    {contact.agency?.name && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Building2 className="h-4 w-4" />
                                            <span>{contact.agency.name}</span>
                                        </div>
                                    )}
                                    {contact.department && (
                                        <div className="text-xs text-muted-foreground pt-2">
                                            {contact.department}
                                        </div>
                                    )}
                                    <div className="text-xs text-muted-foreground pt-2 border-t">
                                        Saved {new Date(saved_at).toLocaleDateString()}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
