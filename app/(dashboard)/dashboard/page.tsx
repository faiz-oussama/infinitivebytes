import prisma from '@/lib/db'
import { getCurrentUserId, checkDailyLimit } from '@/lib/daily-limit'
import { StatsCard } from '@/components/stats-card'
import { EmployeesChart } from '@/components/charts/employees-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, Eye } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

const getDashboardData = unstable_cache(
    async () => {
        const [totalAgencies, totalContacts, agenciesWithCounts] = await Promise.all([
            prisma.agency.count(),
            prisma.contact.count(),
            prisma.agency.findMany({
                take: 7,
                orderBy: {
                    contacts: {
                        _count: 'desc'
                    }
                },
                include: {
                    _count: {
                        select: {
                            contacts: true
                        }
                    }
                }
            })
        ])

        const chartData = agenciesWithCounts.map(agency => ({
            name: agency.name.length > 20 ? agency.name.substring(0, 20) + '...' : agency.name,
            employees: agency._count.contacts
        }))

        return { totalAgencies, totalContacts, chartData }
    },
    ['dashboard'],
    { revalidate: 300, tags: ['dashboard'] }
)

export default async function DashboardPage() {
    const userId = await getCurrentUserId()
    const { viewsToday, remaining } = await checkDailyLimit(userId)
    const { totalAgencies, totalContacts, chartData } = await getDashboardData()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of your agencies and contacts
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    title="Total Agencies"
                    value={totalAgencies.toLocaleString()}
                    description="Registered agencies in the system"
                    icon={Building2}
                />
                <StatsCard
                    title="Total Contacts"
                    value={totalContacts.toLocaleString()}
                    description="Contact records available"
                    icon={Users}
                />
                <StatsCard
                    title="Views Remaining"
                    value={remaining}
                    description={`${viewsToday} of 50 used today`}
                    icon={Eye}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Top Agencies by Contact Count</CardTitle>
                    <CardDescription>
                        Agencies with the most contact records
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <EmployeesChart data={chartData} />
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Navigate to key sections</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link href="/agencies" className="block">
                            <Button variant="outline" className="w-full justify-start">
                                <Building2 className="mr-2 h-4 w-4" />
                                Browse Agencies
                            </Button>
                        </Link>
                        <Link href="/contacts" className="block">
                            <Button variant="outline" className="w-full justify-start">
                                <Users className="mr-2 h-4 w-4" />
                                View Contacts
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Daily Limit</CardTitle>
                        <CardDescription>Contact view usage information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Today's Usage</span>
                                <span className="text-sm text-muted-foreground">{viewsToday} / 50</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${(viewsToday / 50) * 100}%` }}
                                />
                            </div>
                        </div>
                        <Link href="/pricing" className="block">
                            <Button className="w-full">
                                Upgrade for Unlimited Views
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
