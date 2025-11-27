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
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

type Agency = {
    id: string
    name: string
    state: string | null
    type: string | null
    population: number | null
    county: string | null
    website: string | null
}

type AgenciesTableProps = {
    agencies: Agency[]
    currentPage: number
    totalPages: number
    searchQuery: string
}

export function AgenciesTable({
    agencies,
    currentPage,
    totalPages,
    searchQuery,
}: AgenciesTableProps) {
    const router = useRouter()
    const [search, setSearch] = useState(searchQuery)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        router.push(`/agencies?${params.toString()}`)
    }

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        params.set('page', page.toString())
        router.push(`/agencies?${params.toString()}`)
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search agencies by name, state, type, or county..."
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
                            <TableHead>State</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Population</TableHead>
                            <TableHead>County</TableHead>
                            <TableHead>Website</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agencies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No agencies found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            agencies.map((agency) => (
                                <TableRow key={agency.id}>
                                    <TableCell className="font-medium">{agency.name}</TableCell>
                                    <TableCell>{agency.state || '-'}</TableCell>
                                    <TableCell>{agency.type || '-'}</TableCell>
                                    <TableCell>
                                        {agency.population
                                            ? agency.population.toLocaleString()
                                            : '-'}
                                    </TableCell>
                                    <TableCell>{agency.county || '-'}</TableCell>
                                    <TableCell>
                                        {agency.website ? (
                                            <a
                                                href={agency.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Visit
                                            </a>
                                        ) : (
                                            '-'
                                        )}
                                    </TableCell>
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
        </div>
    )
}
