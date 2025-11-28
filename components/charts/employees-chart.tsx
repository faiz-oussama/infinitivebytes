'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type ChartData = {
    name: string
    employees: number
}

type EmployeesChartProps = {
    data: ChartData[]
}

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981']

export function EmployeesChart({ data }: EmployeesChartProps) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                        dataKey="name"
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="p-2">
                                        <p className="font-semibold text-foreground mb-1">
                                            {payload[0].payload.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium text-foreground">
                                                {payload[0].value}
                                            </span>
                                            {' '}contacts
                                        </p>
                                    </div>
                                )
                            }
                            return null
                        }}
                    />
                    <Bar dataKey="employees" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
