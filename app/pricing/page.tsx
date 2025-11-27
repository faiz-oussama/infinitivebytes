'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { GL } from '@/components/gl'
import { Leva } from 'leva'
import { useState } from 'react'

export default function PricingPage() {
    const [hovering, setHovering] = useState(false);

    const features = {
        free: [
            '50 contact views per day',
            'Search agencies and contacts',
            'Basic filtering',
            'Daily limit reset',
        ],
        pro: [
            'Unlimited contact views',
            'Advanced search filters',
            'Export to CSV',
            'Priority support',
            'API access',
            'Custom integrations',
            'Analytics dashboard',
            'Bulk operations',
        ]
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <GL hovering={hovering} />
            <Leva hidden />
            <Header />

            <div className="container mx-auto px-4 py-24 space-y-16 relative z-10">
                {/* Hero Section */}
                <div className="text-center space-y-6 pt-8">
                    <div className="inline-block">
                        <span className="bg-white/10 text-white/90 backdrop-blur-sm font-mono text-sm px-4 py-2 rounded-full border border-white/20">
                            FLEXIBLE PRICING
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-sentient text-white">
                        Choose Your <i className="font-light">Plan</i>
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto font-mono">
                        Unlock unlimited access to contacts and advanced features
                    </p>
                </div>

                {/* Pricing Cards - Made Smaller */}
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Free</h2>
                                <p className="text-white/60 text-sm mt-1">Perfect for getting started</p>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-white">$0</span>
                                <span className="text-white/60">/month</span>
                            </div>
                            <ul className="space-y-3">
                                {features.free.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2.5 text-sm">
                                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                                        <span className="text-white/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                variant="outline"
                                className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                                disabled
                            >
                                Current Plan
                            </Button>
                        </div>
                    </div>

                    {/* Pro Plan - No gradient, no badge */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/30 transition-all">
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Pro</h2>
                                <p className="text-white/60 text-sm mt-1">For power users and teams</p>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-white">$29</span>
                                <span className="text-white/60">/month</span>
                            </div>
                            <ul className="space-y-3">
                                {features.pro.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2.5 text-sm">
                                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                                        <span className="text-white/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className="w-full bg-white text-black hover:bg-white/90 font-semibold"
                                onMouseEnter={() => setHovering(true)}
                                onMouseLeave={() => setHovering(false)}
                            >
                                Upgrade to Pro
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Feature Comparison */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-5">Feature Comparison</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-3 px-3 text-white font-semibold">Feature</th>
                                        <th className="text-center py-3 px-3 text-white font-semibold">Free</th>
                                        <th className="text-center py-3 px-3 text-white font-semibold">Pro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-3 px-3 text-white/80">Contact Views</td>
                                        <td className="text-center py-3 px-3 text-white/60">50/day</td>
                                        <td className="text-center py-3 px-3 text-white">Unlimited</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-3 px-3 text-white/80">Search & Filter</td>
                                        <td className="text-center py-3 px-3">
                                            <Check className="h-4 w-4 text-green-400 inline" />
                                        </td>
                                        <td className="text-center py-3 px-3">
                                            <Check className="h-4 w-4 text-green-400 inline" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-3 px-3 text-white/80">Export Data</td>
                                        <td className="text-center py-3 px-3 text-white/30">-</td>
                                        <td className="text-center py-3 px-3">
                                            <Check className="h-4 w-4 text-green-400 inline" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-3 px-3 text-white/80">API Access</td>
                                        <td className="text-center py-3 px-3 text-white/30">-</td>
                                        <td className="text-center py-3 px-3">
                                            <Check className="h-4 w-4 text-green-400 inline" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-3 text-white/80">Priority Support</td>
                                        <td className="text-center py-3 px-3 text-white/30">-</td>
                                        <td className="text-center py-3 px-3">
                                            <Check className="h-4 w-4 text-green-400 inline" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center space-y-6">
                    <p className="text-white/60 font-mono text-sm">
                        Have questions? Contact our sales team for custom enterprise solutions
                    </p>
                    <Link href="/">
                        <Button
                            variant="outline"
                            className="bg-transparent border-white/20 text-white hover:bg-white/10"
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
