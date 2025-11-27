'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Search, Eye, EyeOff } from 'lucide-react'
import { UpgradePrompt } from '@/components/upgrade-prompt'

type Contact = {
    id: string
    first_name: string | null
    last_name: string | null
    email: string | null
    phone: string | null
    title: string | null
    department: string | null
    agency: { name: string } | null
}

type ContactsTableProps = {
    contacts: Contact[]
    currentPage: number
    totalPages: number
    searchQuery: string
    userId: string
    viewsToday: number
    isAtLimit: boolean
}

export function ContactsTable({
    contacts,
    currentPage,
    totalPages,
    searchQuery,
    userId,
    viewsToday,
    isAtLimit,
}: ContactsTableProps) {
    const router = useRouter()
    const [search, setSearch] = useState(searchQuery)
    const [viewedContacts, setViewedContacts] = useState<Set<string>>(new Set())
    const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
    const [localViewsToday, setLocalViewsToday] = useState(viewsToday)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        router.push(`/contacts?${params.toString()}`)
    }

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        params.set('page', page.toString())
        router.push(`/contacts?${params.toString()}`)
    }

    const handleViewContact = async (contactId: string) => {
        if (isAtLimit || localViewsToday >= 50) {
            setShowUpgradePrompt(true)
            return
        }

        try {
            const response = await fetch('/api/contacts/view', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contactId }),
            })

            if (response.ok) {
                setViewedContacts((prev) => new Set(prev).add(contactId))
                setLocalViewsToday((prev) => prev + 1)

                if (localViewsToday + 1 >= 50) {
                    setShowUpgradePrompt(true)
                }
                router.refresh()
            } else {
                const data = await response.json()
                if (data.error === 'Daily limit reached') {
                    setShowUpgradePrompt(true)
                }
            }
        } catch (error) {
            console.error('Error viewing contact:', error)
        }
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search contacts by name, email, title, or department..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Button type="submit">Search</Button>
            </form>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Agency</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    No contacts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact) => {
                                const isViewed = viewedContacts.has(contact.id)
                                const fullName = [contact.first_name, contact.last_name]
                                    .filter(Boolean)
                                    .join(' ') || '-'

                                return (
                                    <TableRow key={contact.id}>
                                        <TableCell className="font-medium">
                                            {isViewed ? fullName : '•••••'}
                                        </TableCell>
                                        <TableCell>
                                            {isViewed ? contact.email || '-' : '•••••'}
                                        </TableCell>
                                        <TableCell>
                                            {isViewed ? contact.phone || '-' : '•••••'}
                                        </TableCell>
                                        <TableCell>
                                            {isViewed ? contact.title || '-' : '•••••'}
                                        </TableCell>
                                        <TableCell>
                                            {isViewed ? contact.department || '-' : '•••••'}
                                        </TableCell>
                                        <TableCell>
                                            {contact.agency?.name || '-'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {isViewed ? (
                                                <Badge variant="secondary" className="gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    Viewed
                                                </Badge>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleViewContact(contact.id)}
                                                    className="gap-1"
                                                >
                                                    <EyeOff className="h-3 w-3" />
                                                    View
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <UpgradePrompt
                open={showUpgradePrompt}
                onOpenChange={setShowUpgradePrompt}
                viewsToday={localViewsToday}
            />
        </div>
    )
}
