'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
    SortingState,
    ColumnFiltersState,
} from '@tanstack/react-table'
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
import { ChevronLeft, ChevronRight, Search, Eye, EyeOff, ArrowUpDown, MoreHorizontal, Copy, Star } from 'lucide-react'
import { UpgradePrompt } from '@/components/upgrade-prompt'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
    viewedContactIds: string[]
}

const columnHelper = createColumnHelper<Contact>()

export function ContactsTable({
    contacts,
    currentPage,
    totalPages,
    searchQuery,
    userId,
    viewsToday,
    isAtLimit,
    viewedContactIds,
}: ContactsTableProps) {
    const router = useRouter()
    const [search, setSearch] = useState(searchQuery)
    const [viewedContacts, setViewedContacts] = useState<Set<string>>(new Set(viewedContactIds))
    const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
    const [localViewsToday, setLocalViewsToday] = useState(viewsToday)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

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
                toast.success('Contact revealed successfully')

                if (localViewsToday + 1 >= 50) {
                    setShowUpgradePrompt(true)
                }
                router.refresh()
            } else {
                const data = await response.json()
                if (data.error === 'Daily limit reached') {
                    setShowUpgradePrompt(true)
                    toast.error('Daily limit reached')
                } else {
                    toast.error('Failed to view contact')
                }
            }
        } catch (error) {
            toast.error('An error occurred while viewing the contact')
        }
    }

    const columns = [
        columnHelper.accessor(
            (row) => [row.first_name, row.last_name].filter(Boolean).join(' '),
            {
                id: 'name',
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="hover:bg-transparent p-0"
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => {
                    const isViewed = viewedContacts.has(row.original.id)
                    const fullName = [row.original.first_name, row.original.last_name]
                        .filter(Boolean)
                        .join(' ') || '-'
                    return (
                        <span className="font-medium">
                            {isViewed ? fullName : '•••••'}
                        </span>
                    )
                },
            }
        ),
        columnHelper.accessor('email', {
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-transparent p-0"
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const isViewed = viewedContacts.has(row.original.id)
                return isViewed ? row.original.email || '-' : '•••••'
            },
        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
            cell: ({ row }) => {
                const isViewed = viewedContacts.has(row.original.id)
                return isViewed ? row.original.phone || '-' : '•••••'
            },
        }),
        columnHelper.accessor('title', {
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-transparent p-0"
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const isViewed = viewedContacts.has(row.original.id)
                return isViewed ? row.original.title || '-' : '•••••'
            },
        }),
        columnHelper.accessor('department', {
            header: 'Department',
            cell: ({ row }) => {
                const isViewed = viewedContacts.has(row.original.id)
                return isViewed ? row.original.department || '-' : '•••••'
            },
        }),
        columnHelper.accessor('agency.name', {
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-transparent p-0"
                >
                    Agency
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => row.original.agency?.name || '-',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <div className="text-center">Actions</div>,
            cell: ({ row }) => {
                const isViewed = viewedContacts.has(row.original.id)
                const contact = row.original

                const handleCopyEmail = () => {
                    if (contact.email) {
                        navigator.clipboard.writeText(contact.email)
                        toast.success('Email copied to clipboard')
                    } else {
                        toast.error('No email available')
                    }
                }

                const handleSaveContact = async () => {
                    try {
                        const response = await fetch('/api/contacts/save', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ contactId: contact.id }),
                        })

                        if (response.ok) {
                            toast.success('Contact saved successfully')
                            router.refresh()
                        } else {
                            const data = await response.json()
                            toast.error(data.error || 'Failed to save contact')
                        }
                    } catch (error) {
                        toast.error('An error occurred while saving the contact')
                    }
                }

                return (
                    <div className="flex items-center justify-end gap-2">
                        {isViewed ? (
                            <>
                                <Badge variant="secondary" className="gap-1">
                                    <Eye className="h-3 w-3" />
                                    Viewed
                                </Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleCopyEmail}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy Email
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleSaveContact}>
                                            <Star className="mr-2 h-4 w-4" />
                                            Save Contact
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewContact(row.original.id)}
                                className="gap-1"
                            >
                                <EyeOff className="h-3 w-3" />
                                View
                            </Button>
                        )}
                    </div>
                )
            },
        }),
    ]

    const table = useReactTable({
        data: contacts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 20,
            },
        },
    })

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
                <Table className="table-fixed w-full text-sm">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const widthClass =
                                        header.id === 'name' ? 'w-[12%]' :
                                            header.id === 'email' ? 'w-[22%]' :
                                                header.id === 'phone' ? 'w-[11%]' :
                                                    header.id === 'title' ? 'w-[18%]' :
                                                        header.id === 'department' ? 'w-[13%]' :
                                                            header.id === 'agency.name' ? 'w-[12%]' :
                                                                'w-[12%]'
                                    return (
                                        <TableHead key={header.id} className={widthClass}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    No contacts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="break-words overflow-hidden">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
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
